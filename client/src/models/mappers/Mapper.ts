export default abstract class Mapper<Model extends Object, DTO extends Object> {
  public mapFromDTOList(itemDTO: DTO[]): Model[] {
    return itemDTO.map(dto => this.mapFromDTO(dto));
  }

  public mapToDTOList(items: Model[]): DTO[] {
    return items.map(item => this.mapToDTO(item));
  }

  public abstract mapFromDTO(itemDTO: DTO): Model;
  public abstract mapToDTO(item: Model): DTO;
}
