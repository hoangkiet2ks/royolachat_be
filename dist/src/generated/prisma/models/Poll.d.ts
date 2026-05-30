import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PollModel = runtime.Types.Result.DefaultSelection<Prisma.$PollPayload>;
export type AggregatePoll = {
    _count: PollCountAggregateOutputType | null;
    _avg: PollAvgAggregateOutputType | null;
    _sum: PollSumAggregateOutputType | null;
    _min: PollMinAggregateOutputType | null;
    _max: PollMaxAggregateOutputType | null;
};
export type PollAvgAggregateOutputType = {
    id: number | null;
    messageId: number | null;
};
export type PollSumAggregateOutputType = {
    id: number | null;
    messageId: number | null;
};
export type PollMinAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    title: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PollMaxAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    title: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PollCountAggregateOutputType = {
    id: number;
    messageId: number;
    title: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PollAvgAggregateInputType = {
    id?: true;
    messageId?: true;
};
export type PollSumAggregateInputType = {
    id?: true;
    messageId?: true;
};
export type PollMinAggregateInputType = {
    id?: true;
    messageId?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PollMaxAggregateInputType = {
    id?: true;
    messageId?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PollCountAggregateInputType = {
    id?: true;
    messageId?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PollAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollWhereInput;
    orderBy?: Prisma.PollOrderByWithRelationInput | Prisma.PollOrderByWithRelationInput[];
    cursor?: Prisma.PollWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PollCountAggregateInputType;
    _avg?: PollAvgAggregateInputType;
    _sum?: PollSumAggregateInputType;
    _min?: PollMinAggregateInputType;
    _max?: PollMaxAggregateInputType;
};
export type GetPollAggregateType<T extends PollAggregateArgs> = {
    [P in keyof T & keyof AggregatePoll]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePoll[P]> : Prisma.GetScalarType<T[P], AggregatePoll[P]>;
};
export type PollGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollWhereInput;
    orderBy?: Prisma.PollOrderByWithAggregationInput | Prisma.PollOrderByWithAggregationInput[];
    by: Prisma.PollScalarFieldEnum[] | Prisma.PollScalarFieldEnum;
    having?: Prisma.PollScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PollCountAggregateInputType | true;
    _avg?: PollAvgAggregateInputType;
    _sum?: PollSumAggregateInputType;
    _min?: PollMinAggregateInputType;
    _max?: PollMaxAggregateInputType;
};
export type PollGroupByOutputType = {
    id: number;
    messageId: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PollCountAggregateOutputType | null;
    _avg: PollAvgAggregateOutputType | null;
    _sum: PollSumAggregateOutputType | null;
    _min: PollMinAggregateOutputType | null;
    _max: PollMaxAggregateOutputType | null;
};
type GetPollGroupByPayload<T extends PollGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PollGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PollGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PollGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PollGroupByOutputType[P]>;
}>>;
export type PollWhereInput = {
    AND?: Prisma.PollWhereInput | Prisma.PollWhereInput[];
    OR?: Prisma.PollWhereInput[];
    NOT?: Prisma.PollWhereInput | Prisma.PollWhereInput[];
    id?: Prisma.IntFilter<"Poll"> | number;
    messageId?: Prisma.IntFilter<"Poll"> | number;
    title?: Prisma.StringFilter<"Poll"> | string;
    createdAt?: Prisma.DateTimeFilter<"Poll"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Poll"> | Date | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
    options?: Prisma.PollOptionListRelationFilter;
};
export type PollOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    message?: Prisma.MessageOrderByWithRelationInput;
    options?: Prisma.PollOptionOrderByRelationAggregateInput;
};
export type PollWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    messageId?: number;
    AND?: Prisma.PollWhereInput | Prisma.PollWhereInput[];
    OR?: Prisma.PollWhereInput[];
    NOT?: Prisma.PollWhereInput | Prisma.PollWhereInput[];
    title?: Prisma.StringFilter<"Poll"> | string;
    createdAt?: Prisma.DateTimeFilter<"Poll"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Poll"> | Date | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
    options?: Prisma.PollOptionListRelationFilter;
}, "id" | "messageId">;
export type PollOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PollCountOrderByAggregateInput;
    _avg?: Prisma.PollAvgOrderByAggregateInput;
    _max?: Prisma.PollMaxOrderByAggregateInput;
    _min?: Prisma.PollMinOrderByAggregateInput;
    _sum?: Prisma.PollSumOrderByAggregateInput;
};
export type PollScalarWhereWithAggregatesInput = {
    AND?: Prisma.PollScalarWhereWithAggregatesInput | Prisma.PollScalarWhereWithAggregatesInput[];
    OR?: Prisma.PollScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PollScalarWhereWithAggregatesInput | Prisma.PollScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Poll"> | number;
    messageId?: Prisma.IntWithAggregatesFilter<"Poll"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Poll"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Poll"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Poll"> | Date | string;
};
export type PollCreateInput = {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    message: Prisma.MessageCreateNestedOneWithoutPollInput;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
};
export type PollUncheckedCreateInput = {
    id?: number;
    messageId: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
};
export type PollUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    message?: Prisma.MessageUpdateOneRequiredWithoutPollNestedInput;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
};
export type PollUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    messageId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
};
export type PollCreateManyInput = {
    id?: number;
    messageId: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PollUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    messageId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollNullableScalarRelationFilter = {
    is?: Prisma.PollWhereInput | null;
    isNot?: Prisma.PollWhereInput | null;
};
export type PollCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PollAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
};
export type PollMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PollMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PollSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
};
export type PollScalarRelationFilter = {
    is?: Prisma.PollWhereInput;
    isNot?: Prisma.PollWhereInput;
};
export type PollCreateNestedOneWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutMessageInput;
    connect?: Prisma.PollWhereUniqueInput;
};
export type PollUncheckedCreateNestedOneWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutMessageInput;
    connect?: Prisma.PollWhereUniqueInput;
};
export type PollUpdateOneWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutMessageInput;
    upsert?: Prisma.PollUpsertWithoutMessageInput;
    disconnect?: Prisma.PollWhereInput | boolean;
    delete?: Prisma.PollWhereInput | boolean;
    connect?: Prisma.PollWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PollUpdateToOneWithWhereWithoutMessageInput, Prisma.PollUpdateWithoutMessageInput>, Prisma.PollUncheckedUpdateWithoutMessageInput>;
};
export type PollUncheckedUpdateOneWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutMessageInput;
    upsert?: Prisma.PollUpsertWithoutMessageInput;
    disconnect?: Prisma.PollWhereInput | boolean;
    delete?: Prisma.PollWhereInput | boolean;
    connect?: Prisma.PollWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PollUpdateToOneWithWhereWithoutMessageInput, Prisma.PollUpdateWithoutMessageInput>, Prisma.PollUncheckedUpdateWithoutMessageInput>;
};
export type PollCreateNestedOneWithoutOptionsInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutOptionsInput, Prisma.PollUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutOptionsInput;
    connect?: Prisma.PollWhereUniqueInput;
};
export type PollUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: Prisma.XOR<Prisma.PollCreateWithoutOptionsInput, Prisma.PollUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.PollCreateOrConnectWithoutOptionsInput;
    upsert?: Prisma.PollUpsertWithoutOptionsInput;
    connect?: Prisma.PollWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PollUpdateToOneWithWhereWithoutOptionsInput, Prisma.PollUpdateWithoutOptionsInput>, Prisma.PollUncheckedUpdateWithoutOptionsInput>;
};
export type PollCreateWithoutMessageInput = {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    options?: Prisma.PollOptionCreateNestedManyWithoutPollInput;
};
export type PollUncheckedCreateWithoutMessageInput = {
    id?: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    options?: Prisma.PollOptionUncheckedCreateNestedManyWithoutPollInput;
};
export type PollCreateOrConnectWithoutMessageInput = {
    where: Prisma.PollWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
};
export type PollUpsertWithoutMessageInput = {
    update: Prisma.XOR<Prisma.PollUpdateWithoutMessageInput, Prisma.PollUncheckedUpdateWithoutMessageInput>;
    create: Prisma.XOR<Prisma.PollCreateWithoutMessageInput, Prisma.PollUncheckedCreateWithoutMessageInput>;
    where?: Prisma.PollWhereInput;
};
export type PollUpdateToOneWithWhereWithoutMessageInput = {
    where?: Prisma.PollWhereInput;
    data: Prisma.XOR<Prisma.PollUpdateWithoutMessageInput, Prisma.PollUncheckedUpdateWithoutMessageInput>;
};
export type PollUpdateWithoutMessageInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUpdateManyWithoutPollNestedInput;
};
export type PollUncheckedUpdateWithoutMessageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.PollOptionUncheckedUpdateManyWithoutPollNestedInput;
};
export type PollCreateWithoutOptionsInput = {
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    message: Prisma.MessageCreateNestedOneWithoutPollInput;
};
export type PollUncheckedCreateWithoutOptionsInput = {
    id?: number;
    messageId: number;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PollCreateOrConnectWithoutOptionsInput = {
    where: Prisma.PollWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollCreateWithoutOptionsInput, Prisma.PollUncheckedCreateWithoutOptionsInput>;
};
export type PollUpsertWithoutOptionsInput = {
    update: Prisma.XOR<Prisma.PollUpdateWithoutOptionsInput, Prisma.PollUncheckedUpdateWithoutOptionsInput>;
    create: Prisma.XOR<Prisma.PollCreateWithoutOptionsInput, Prisma.PollUncheckedCreateWithoutOptionsInput>;
    where?: Prisma.PollWhereInput;
};
export type PollUpdateToOneWithWhereWithoutOptionsInput = {
    where?: Prisma.PollWhereInput;
    data: Prisma.XOR<Prisma.PollUpdateWithoutOptionsInput, Prisma.PollUncheckedUpdateWithoutOptionsInput>;
};
export type PollUpdateWithoutOptionsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    message?: Prisma.MessageUpdateOneRequiredWithoutPollNestedInput;
};
export type PollUncheckedUpdateWithoutOptionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    messageId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollCountOutputType = {
    options: number;
};
export type PollCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | PollCountOutputTypeCountOptionsArgs;
};
export type PollCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollCountOutputTypeSelect<ExtArgs> | null;
};
export type PollCountOutputTypeCountOptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollOptionWhereInput;
};
export type PollSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    title?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.Poll$optionsArgs<ExtArgs>;
    _count?: boolean | Prisma.PollCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poll"]>;
export type PollSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    title?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poll"]>;
export type PollSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    title?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poll"]>;
export type PollSelectScalar = {
    id?: boolean;
    messageId?: boolean;
    title?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PollOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "messageId" | "title" | "createdAt" | "updatedAt", ExtArgs["result"]["poll"]>;
export type PollInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    options?: boolean | Prisma.Poll$optionsArgs<ExtArgs>;
    _count?: boolean | Prisma.PollCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PollIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
};
export type PollIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
};
export type $PollPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Poll";
    objects: {
        message: Prisma.$MessagePayload<ExtArgs>;
        options: Prisma.$PollOptionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        messageId: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["poll"]>;
    composites: {};
};
export type PollGetPayload<S extends boolean | null | undefined | PollDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PollPayload, S>;
export type PollCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PollFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PollCountAggregateInputType | true;
};
export interface PollDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Poll'];
        meta: {
            name: 'Poll';
        };
    };
    findUnique<T extends PollFindUniqueArgs>(args: Prisma.SelectSubset<T, PollFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PollFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PollFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PollFindFirstArgs>(args?: Prisma.SelectSubset<T, PollFindFirstArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PollFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PollFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PollFindManyArgs>(args?: Prisma.SelectSubset<T, PollFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PollCreateArgs>(args: Prisma.SelectSubset<T, PollCreateArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PollCreateManyArgs>(args?: Prisma.SelectSubset<T, PollCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PollCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PollCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PollDeleteArgs>(args: Prisma.SelectSubset<T, PollDeleteArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PollUpdateArgs>(args: Prisma.SelectSubset<T, PollUpdateArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PollDeleteManyArgs>(args?: Prisma.SelectSubset<T, PollDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PollUpdateManyArgs>(args: Prisma.SelectSubset<T, PollUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PollUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PollUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PollUpsertArgs>(args: Prisma.SelectSubset<T, PollUpsertArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PollCountArgs>(args?: Prisma.Subset<T, PollCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PollCountAggregateOutputType> : number>;
    aggregate<T extends PollAggregateArgs>(args: Prisma.Subset<T, PollAggregateArgs>): Prisma.PrismaPromise<GetPollAggregateType<T>>;
    groupBy<T extends PollGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PollGroupByArgs['orderBy'];
    } : {
        orderBy?: PollGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PollGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPollGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PollFieldRefs;
}
export interface Prisma__PollClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    message<T extends Prisma.MessageDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MessageDefaultArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    options<T extends Prisma.Poll$optionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Poll$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PollFieldRefs {
    readonly id: Prisma.FieldRef<"Poll", 'Int'>;
    readonly messageId: Prisma.FieldRef<"Poll", 'Int'>;
    readonly title: Prisma.FieldRef<"Poll", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Poll", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Poll", 'DateTime'>;
}
export type PollFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where: Prisma.PollWhereUniqueInput;
};
export type PollFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where: Prisma.PollWhereUniqueInput;
};
export type PollFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where?: Prisma.PollWhereInput;
    orderBy?: Prisma.PollOrderByWithRelationInput | Prisma.PollOrderByWithRelationInput[];
    cursor?: Prisma.PollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollScalarFieldEnum | Prisma.PollScalarFieldEnum[];
};
export type PollFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where?: Prisma.PollWhereInput;
    orderBy?: Prisma.PollOrderByWithRelationInput | Prisma.PollOrderByWithRelationInput[];
    cursor?: Prisma.PollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollScalarFieldEnum | Prisma.PollScalarFieldEnum[];
};
export type PollFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where?: Prisma.PollWhereInput;
    orderBy?: Prisma.PollOrderByWithRelationInput | Prisma.PollOrderByWithRelationInput[];
    cursor?: Prisma.PollWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollScalarFieldEnum | Prisma.PollScalarFieldEnum[];
};
export type PollCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollCreateInput, Prisma.PollUncheckedCreateInput>;
};
export type PollCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PollCreateManyInput | Prisma.PollCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PollCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    data: Prisma.PollCreateManyInput | Prisma.PollCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PollIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PollUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollUpdateInput, Prisma.PollUncheckedUpdateInput>;
    where: Prisma.PollWhereUniqueInput;
};
export type PollUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PollUpdateManyMutationInput, Prisma.PollUncheckedUpdateManyInput>;
    where?: Prisma.PollWhereInput;
    limit?: number;
};
export type PollUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollUpdateManyMutationInput, Prisma.PollUncheckedUpdateManyInput>;
    where?: Prisma.PollWhereInput;
    limit?: number;
    include?: Prisma.PollIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PollUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where: Prisma.PollWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollCreateInput, Prisma.PollUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PollUpdateInput, Prisma.PollUncheckedUpdateInput>;
};
export type PollDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
    where: Prisma.PollWhereUniqueInput;
};
export type PollDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollWhereInput;
    limit?: number;
};
export type Poll$optionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where?: Prisma.PollOptionWhereInput;
    orderBy?: Prisma.PollOptionOrderByWithRelationInput | Prisma.PollOptionOrderByWithRelationInput[];
    cursor?: Prisma.PollOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollOptionScalarFieldEnum | Prisma.PollOptionScalarFieldEnum[];
};
export type PollDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollSelect<ExtArgs> | null;
    omit?: Prisma.PollOmit<ExtArgs> | null;
    include?: Prisma.PollInclude<ExtArgs> | null;
};
export {};
