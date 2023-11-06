import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  DataType,
  Default,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'product', timestamps: false })
export class Product extends Model<Product> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @IsUUID(4)
  @Column
  key: string;

  @Column(DataType.DATEONLY)
  data_preco: string;

  @Column(DataType.BIGINT)
  cod_produto: number;

  @Column(DataType.STRING)
  sku: string;

  @Column(DataType.DOUBLE)
  qtd_estoque: number;

  @Column(DataType.DOUBLE)
  desconto: number;

  @CreatedAt
  @Column({ field: 'data_hora_insercao', type: DataType.DATE })
  data_hora_insercao: Date;

  @Column(DataType.DATEONLY)
  data_inicio: string;

  @Column(DataType.DATEONLY)
  data_fim: string;
}
