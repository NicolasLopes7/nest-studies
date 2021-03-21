import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDTO } from './dtos/createCategory.dto';
import { UpdateCategoryDTO } from './dtos/updateCategory.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: PlayersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDTO) {
    const { category } = createCategoryDto;
    const selectedCategories = await this.categoryModel
      .find({ category })
      .exec();
    if (selectedCategories.length === 0) {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();
    } else throw new BadRequestException(`Categoria ${category} já encontrada`);
  }

  async get() {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getCategoryById(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category)
      throw new NotFoundException('A categoria não foi encontrada');
    return category;
  }

  async updateCategory(
    categoryId: string,
    updateCategoryData: UpdateCategoryDTO,
  ) {
    const selectedCategory = await this.categoryModel
      .findById(categoryId)
      .exec();

    if (!selectedCategory)
      throw new NotFoundException('A categoria buscada não existe');

    await this.categoryModel
      .findOneAndUpdate({ _id: categoryId }, { $set: updateCategoryData })
      .exec();
  }

  async linkPlayerCategory(categoryName: string, playerId: string) {
    const selectedPlayer = await this.playerService.getPlayerById(playerId);
    if (!selectedPlayer) throw new NotFoundException('O jogador não existe');

    const selectedCategory = await this.categoryModel
      .findOne({ category: categoryName })
      .exec();

    if (!selectedCategory)
      throw new NotFoundException('A categoria não existe');

    if (
      selectedCategory.players.some(
        (player) => String(player._id) == String(selectedPlayer._id),
      )
    )
      throw new BadRequestException(
        'O jogador já está atribuido a esta categoria',
      );

    selectedCategory.players.push(selectedPlayer);
    await this.categoryModel
      .findOneAndUpdate({ category: categoryName }, { $set: selectedCategory })
      .exec();
  }
}
