namespace ProductCatalog.Api.Dtos;

public class ProductDto
{
    public Guid Id { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public string? DepartmentCode { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
}