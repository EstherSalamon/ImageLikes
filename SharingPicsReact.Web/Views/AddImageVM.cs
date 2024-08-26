using Microsoft.Extensions.Diagnostics.HealthChecks;
using SharingPicsReact.Data;

namespace SharingPicsReact.Web.Views
{
    public class AddImageVM
    {
        public string Title { get; set; }
        public string Base64 { get; set; }
    }
}
