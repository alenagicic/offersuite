using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using OfferSuite.Database;
using OfferSuite.Entity;
using OfferSuite.Model;
using System.Security.Claims;


namespace OfferSuite.Services{

    public class AuthServices{

        private readonly DatabaseContext _context;
        private readonly IHttpContextAccessor _httpContext;
        public AuthServices(DatabaseContext Context, IHttpContextAccessor HttpContext){
            _context = Context;
            _httpContext = HttpContext;
        }
        public bool SignIn(SignInModel model){
            
            var Result = _context.AccountEntities.Where(x => x.Email == model.Username).FirstOrDefault();
            
            if(Result != null){
                model.Username = Result!.Email;
            }
          

            if(Result != null && model.Password == Result!.Password){

                var token = GenerateJwtToken(model);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(1)
                };

                _httpContext.HttpContext!.Response.Cookies.Append("AuthToken", token, cookieOptions);
                
                return true;
            }

            return false;
        }
        public string GenerateJwtToken(SignInModel model)
        {

            if(model.PsuedoName == null){
                model.PsuedoName = "";
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secure-jwt-secret-key-super-long-keyyyyy"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, model.Username!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("psuedoname", model.PsuedoName!)
            };

            var token = new JwtSecurityToken(
                issuer: "Foodplanner",
                audience: "Foodplanner-user",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public bool SignUp(SignInModel model){
            
            var checkUserExists = _context.AccountEntities.Where(x => x.Email == model.Username).FirstOrDefault();

            if(checkUserExists != null){
                return false;
            }

            var Entity = new AccountEntity(){
                Password = model.Password,
                Email = model.Username
            };

            _context.AccountEntities.Add(Entity);

            var Result = _context.SaveChanges();

            if(Result > 0){

                SignIn(model);

                return true;
            }

            return false;
        }
        public SignInModel GetUser(string username){

            var result = _context.AccountEntities
                .Where(x => x.Email == username
                .ToLower()).FirstOrDefault();

            SignInModel model = new();

            if(result != null){
                model.Username = result!.Email;
                model.Password = result.Password;
            }

            return model;

        }
        public bool UpdateUser(SignInModel model){

            var Entity = _context.AccountEntities
                .Where(x => x.Email == model.Username)
                .FirstOrDefault();

            if (!string.IsNullOrEmpty(model.Password))
            {
                Entity!.Password = model.Password;
            }

            var Result = _context.AccountEntities.Update(Entity!);

            var ResultSet = _context.SaveChanges();

            if(ResultSet > 0){
                return true;
            }

            return false;
        }
        public bool CheckIfUserExists(string email){

            var resultGet = _context.AccountEntities
                .Where(x => x.Email!.ToLower() == email.ToLower())
                .FirstOrDefault();

            if(resultGet != null){
                return true;
            }

            return false;
        }
        public bool SignInTime(string username){
            
            LastSignedIn model = new(){
                DateTime = DateTime.Now.ToString("MM, dd, HH:mm"),
                Username = username,
            };

            _context.SignedInEntities.Add(model);
            _context.SaveChanges();

            return true;
        }
    }

}