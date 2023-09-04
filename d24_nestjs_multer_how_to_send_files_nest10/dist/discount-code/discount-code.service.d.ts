import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
export declare class DiscountCodeService {
    create(createDiscountCodeDto: CreateDiscountCodeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDiscountCodeDto: UpdateDiscountCodeDto): string;
    remove(id: number): string;
}
