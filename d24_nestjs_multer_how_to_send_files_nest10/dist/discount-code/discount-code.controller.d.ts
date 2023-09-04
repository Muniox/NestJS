import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
export declare class DiscountCodeController {
    private readonly discountCodeService;
    constructor(discountCodeService: DiscountCodeService);
    create(createDiscountCodeDto: CreateDiscountCodeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDiscountCodeDto: UpdateDiscountCodeDto): string;
    remove(id: string): string;
}
