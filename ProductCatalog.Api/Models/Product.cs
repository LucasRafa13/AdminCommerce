namespace ProductCatalog.Api.Models;

public class Product
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DepartmentCode { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public bool Deleted { get; set; }
}
