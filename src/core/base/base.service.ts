import { EntityId } from "typeorm/repository/EntityId";
import { BaseRepository, BaseTreeRepository } from "./base.repository";
import { BaseEntity } from "./base.entity";
import { NotFoundException } from "@nestjs/common";

export class BaseService<E extends BaseEntity> {
    constructor(protected readonly repo: BaseRepository<E> | BaseTreeRepository<E>) {
    }

    async findById(id: EntityId): Promise<E> {
        const where: any = { id };
        return this.repo.findOne({ where })
    }

    async remove(id: EntityId){
        const entity = await this.findById(id);
        if(entity ==null){
            throw new NotFoundException("The entity not found")
        }
        return this.repo.remove(entity);
    }

}