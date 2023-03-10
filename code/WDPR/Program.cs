using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WDPR.Data;
using WDPR.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DbTheaterLaakContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbTheaterLaakContext") ?? throw new InvalidOperationException("Connection string 'DbBoekingContext' not found.")));
builder.Services.AddScoped<IDbTheaterLaakContext, DbTheaterLaakContext>();

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddIdentity<Gebruiker, IdentityRole>(opt => {
    opt.User.RequireUniqueEmail = true;
})
                .AddEntityFrameworkStores<DbTheaterLaakContext>()
                .AddDefaultTokenProviders();

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:7047",
        ValidAudience = "https://localhost:7047",
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"))
    };
});

// Add services to the container.

builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    if (!await roleManager.RoleExistsAsync("admin"))
    {
    await roleManager.CreateAsync(new IdentityRole("admin"));
    }
    if (!await roleManager.RoleExistsAsync("bezoeker"))
    {
    await roleManager.CreateAsync(new IdentityRole("bezoeker"));
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<BoekingUpdateHub>("/myhub");
});

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{Id?}");

app.MapFallbackToFile("index.html");

app.Run();
