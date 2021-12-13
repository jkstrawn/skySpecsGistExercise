using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace SkySpecs
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return new ContentResult
            {
                ContentType = "text/html",
                StatusCode = (int)HttpStatusCode.OK,
                Content = "<html><body>Go to <a href='http://localhost:8080/'>localhost:8080</a></body></html>"
            };
        }
    }
}