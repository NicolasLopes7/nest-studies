import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/createCategory.dto';
import { UpdateCategoryDTO } from './dtos/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async getCategories() {
    return await this.categoryService.get();
  }

  @Get('/:categoryId')
  async getCategoryById(@Param('categoryId') categoryId: string) {
    return await this.categoryService.getCategoryById(categoryId);
  }

  @Put('/:categoryId')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return await this.categoryService.updateCategory(
      categoryId,
      updateCategoryDTO,
    );
  }

  @Post('/:categoryId/players/:playerId')
  async linkPlayerCategory(
    @Param('categoryId') categoryId: string,
    @Param('playerId') playerId: string,
  ) {
    await this.categoryService.linkPlayerCategory(categoryId, playerId);
  }
}
