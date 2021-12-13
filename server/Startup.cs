using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.HttpOverrides;

namespace SkySpecs
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var configuration = Configuration.GetSection("MyConfiguration").Get<ServerConfiguration>();

            // var connectionString = Configuration.GetConnectionString("db_connection");

            // services.AddDbContext<DataContext>(options =>
            //     options.UseSqlServer(connectionString)
            // );

            // services.AddTransient<IDbConnection>((sp) => new SqlConnection(connectionString));

            // services.AddSingleton<IDataRepository, DataRepository>();

            // services.AddSingleton<IGameState, GameState>();

            var allowedOrigins = new List<string>();

            allowedOrigins.Add(configuration.ClientUrl);
            allowedOrigins.Add("http://localhost:8080");

            services.AddControllers();
            services.AddCors(options => options.AddPolicy(
                "CorsPolicy",
                builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins(allowedOrigins.ToArray())
            ));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseHttpsRedirection();
            var options = new FileServerOptions();
            options.StaticFileOptions.ServeUnknownFileTypes = true;
            app.UseFileServer(options);
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();


            // app.UseEndpoints(endpoints =>
            // {
            //     endpoints.MapControllers();
            // });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
