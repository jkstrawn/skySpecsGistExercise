// [Bind("Id,Title,ReleaseDate,Genre,Price,Rating")] Movie movie

using System.Collections.Generic;
using System.Dynamic;
using System.Linq;

namespace SkySpecs
{
    public class ApiGistHeader
    {
        public string id;
        public string created_at;
        public string description;
    }

    public class ApiGistFile
    {
        public string filename;
    }

    public class ApiGistDetail : ApiGistHeader
    {
        public Dictionary<string, ApiGistFile> files;
    }

    public class GistHeader
    {
        public string Id;
        public string CreatedAt;
        public string Description;

        public static GistHeader FromApi(ApiGistHeader header)
        {
            return new GistHeader
            {
                Id = header.id,
                Description = header.description,
                CreatedAt = header.created_at,
            };
        }

        public dynamic ToJson()
        {
            dynamic json = new ExpandoObject();
            json.id = Id;
            json.created = CreatedAt;
            json.description = Description;
            return json;
        }
    }

    public class GistDetail : GistHeader
    {
        public List<string> FileNames;

        public GistDetail(GistHeader header)
        {
            Id = header.Id;
            CreatedAt = header.CreatedAt;
            Description = header.Description;
        }

        public static GistDetail FromApi(ApiGistDetail detail)
        {
            var header = GistHeader.FromApi(detail);
            return new GistDetail(header)
            {
                FileNames = detail.files.Keys.Select(key => detail.files[key].filename).ToList()
            };
        }

        public new dynamic ToJson()
        {
            dynamic json = base.ToJson();
            json.fileNames = FileNames;
            return json;
        }
    }
}