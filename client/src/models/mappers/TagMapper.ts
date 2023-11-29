import Mapper from "./Mapper";
import {Tag} from "../entities/Tag";
import {TagDTO} from "../../api/dto/TagDTO";
import {mapValueToInterface} from "../../utils/models";

export class TagMapper extends Mapper<Tag, TagDTO> {
    mapFromDTO(tagDTO: TagDTO): Tag {
        return new Tag(<Partial<Tag>>tagDTO);
    }

    mapToDTO(tag: Tag): TagDTO {
        return mapValueToInterface(tag) as TagDTO;
    }
}
