export interface IGoal {

    _id?: string;
    title: string;
    description: string;
    deadline?: Date;
    isPublic: boolean;
    publicId?: string;
    order: number;
    parentId?: string;
    childGoals?: IGoal[];
    ownerId?: string;
    createdAt?: Date;
    updatedAt?: Date;

  }