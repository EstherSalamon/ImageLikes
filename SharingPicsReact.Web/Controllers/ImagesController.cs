using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SharingPicsReact.Data;
using SharingPicsReact.Web.Views;
using System.Text.Json;

namespace SharingPicsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        //https://github.com/EstherSalamon/hmwk3-20
        //This is how far I got back then

        private readonly string _connection;

        public ImagesController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("all")]
        public List<Image> GetAllImages()
        {
            ImagesRepository repo = new ImagesRepository(_connection);
            return repo.GetImages();
        }

        [HttpPost("add")]
        public int AddImage(AddImageVM vm)
        {
            int index = vm.Base64.IndexOf(',');
            string base64 = vm.Base64.Substring(index + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            string guid = $"{Guid.NewGuid()}";
            System.IO.File.WriteAllBytes($"Uploads/{guid}", imageBytes);
            Image image = new Image
            {
                Title = vm.Title,
                DateUploaded = DateTime.Now,
                Guid = guid,
                Likes = 0
            };
            ImagesRepository repo = new ImagesRepository(_connection);
            return repo.AddImage(image);
        }

        [HttpPost("like")]
        public void LikeImage(LikeImageVM vm)
        {
            ImagesRepository repo = new ImagesRepository(_connection);
            repo.AddLike(vm.Id);
            List<int> likedIds = HttpContext.Session.Get<List<int>>("liked-ids");
            if(likedIds == null)
            {
                likedIds = new List<int>();
            }
            likedIds.Add(vm.Id);
            HttpContext.Session.Set("liked-ids", likedIds);
        }

        [HttpGet("get")]
        public IActionResult GetImage(string guid)
        {
            byte[] bytes = System.IO.File.ReadAllBytes($"Uploads/{guid}");
            return File(bytes, "image/jpeg");
        }

        [HttpGet("byid")]
        public ImageVM GetById(int id)
        {
            List<int> likedIds = HttpContext.Session.Get<List<int>>("liked-ids");
            bool allowLike = likedIds == null || !likedIds.Contains(id);
            ImagesRepository repo = new ImagesRepository(_connection);
            ImageVM vm = new ImageVM
            {
                Image = repo.GetById(id), 
                AllowLike = allowLike
            };
            return vm;
        }
    }

    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            string value = session.GetString(key);

            return value == null ? default(T) :
                JsonSerializer.Deserialize<T>(value);
        }
    }
}
