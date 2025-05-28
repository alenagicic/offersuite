using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OfferSuite.Filters{

    public class LockControllerIfUserLoggedInAttribute : ActionFilterAttribute{
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.Items["User"];

            if (user == null)
            {
                context.Result = new RedirectToActionResult("SignInView", "Auth", null);
            }

            base.OnActionExecuting(context);
        }

    }
}