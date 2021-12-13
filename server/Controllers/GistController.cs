using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace SkySpecs
{
    [Route("api/[controller]")]
    [ApiController]
    public class GistController : Controller
    {
        static HttpClient client = new HttpClient();


        [HttpGet("favorites")]
        public JsonResult Favorites()
        {
            var fileText = System.IO.File.ReadAllText(@"./favorites.json");
            var json = JsonConvert.DeserializeObject<List<GistHeader>>(fileText);

            return Json(json.Select(x => x.ToJson()));
        }

        [HttpGet("forUser/{id}")]
        public async Task<JsonResult> ForUser(string id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.github.com/users/{id}/gists");

            // The gist api requires a User-Agent
            request.Headers.UserAgent.Add(new ProductInfoHeaderValue("SkySpecsGistViewer", "1.0"));
            request.Headers.UserAgent.Add(new ProductInfoHeaderValue("(+https://github.com/jkstrawn)"));

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseText = await response.Content.ReadAsStringAsync();
                var json = JsonConvert.DeserializeObject<List<ApiGistHeader>>(responseText);
                var converted = json.Select(x => GistHeader.FromApi(x).ToJson());

                return Json(converted);
            }

            return null;
        }

        [HttpGet("detail/{id}")]
        public async Task<JsonResult> Detail(string id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.github.com/gists/{id}");

            // The gist api requires a User-Agent
            request.Headers.UserAgent.Add(new ProductInfoHeaderValue("SkySpecsGistViewer", "1.0"));
            request.Headers.UserAgent.Add(new ProductInfoHeaderValue("(+https://github.com/jkstrawn)"));

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseText = await response.Content.ReadAsStringAsync();
                var json = JsonConvert.DeserializeObject<ApiGistDetail>(responseText);
                var converted = GistDetail.FromApi(json).ToJson();

                return Json(converted);
            }

            return null;
        }

        [HttpPost("favorite")]
        public void Favorite([FromBody] GistFavoriteRequest request)
        {
            var fileText = System.IO.File.ReadAllText(@"./favorites.json");
            var existingFavorites = JsonConvert.DeserializeObject<List<GistHeader>>(fileText);

            existingFavorites.Add(new GistHeader
            {
                Id = request.Id,
                CreatedAt = request.Created,
                Description = request.Description,
            });


            var jsonText = JsonConvert.SerializeObject(existingFavorites);
            System.IO.File.WriteAllText(@"./favorites.json", jsonText);
        }

        [HttpPost("unfavorite/{id}")]
        public void Unfavorite(string id)
        {
            var fileText = System.IO.File.ReadAllText(@"./favorites.json");
            var existingFavorites = JsonConvert.DeserializeObject<List<GistHeader>>(fileText);

            existingFavorites = existingFavorites.Where(x => x.Id != id).ToList();

            var jsonText = JsonConvert.SerializeObject(existingFavorites);
            System.IO.File.WriteAllText(@"./favorites.json", jsonText);
        }
    }
}


