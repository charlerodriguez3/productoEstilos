export class Product{
    id: number= 0;
    name: string= '';
    description: string= '';
    internalReference?: string= '';
    unitPrice: number= 0.0;
    state?: boolean= true;
    unitMeasure?: string= '';
    creationDate?: Date;
}