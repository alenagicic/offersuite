using Microsoft.EntityFrameworkCore;
using OfferSuite.Database;
using OfferSuite.Factory;
using OfferSuite.Middleware;
using OfferSuite.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<AuthServices>();

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<DealerServices>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<AccountFactory>();
builder.Services.AddScoped<DealerFactory>();

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlite(@"Data Source=app.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod();
});


app.UseMiddleware<TokenValidationMiddleware>("my-secure-jwt-secret-key-super-long-keyyyyy");


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
