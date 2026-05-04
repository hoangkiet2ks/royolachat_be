import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type MessageReactionModel = runtime.Types.Result.DefaultSelection<Prisma.$MessageReactionPayload>;
export type AggregateMessageReaction = {
    _count: MessageReactionCountAggregateOutputType | null;
    _avg: MessageReactionAvgAggregateOutputType | null;
    _sum: MessageReactionSumAggregateOutputType | null;
    _min: MessageReactionMinAggregateOutputType | null;
    _max: MessageReactionMaxAggregateOutputType | null;
};
export type MessageReactionAvgAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    userId: number | null;
};
export type MessageReactionSumAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    userId: number | null;
};
export type MessageReactionMinAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    userId: number | null;
    emoji: string | null;
    createdAt: Date | null;
};
export type MessageReactionMaxAggregateOutputType = {
    id: number | null;
    messageId: number | null;
    userId: number | null;
    emoji: string | null;
    createdAt: Date | null;
};
export type MessageReactionCountAggregateOutputType = {
    id: number;
    messageId: number;
    userId: number;
    emoji: number;
    createdAt: number;
    _all: number;
};
export type MessageReactionAvgAggregateInputType = {
    id?: true;
    messageId?: true;
    userId?: true;
};
export type MessageReactionSumAggregateInputType = {
    id?: true;
    messageId?: true;
    userId?: true;
};
export type MessageReactionMinAggregateInputType = {
    id?: true;
    messageId?: true;
    userId?: true;
    emoji?: true;
    createdAt?: true;
};
export type MessageReactionMaxAggregateInputType = {
    id?: true;
    messageId?: true;
    userId?: true;
    emoji?: true;
    createdAt?: true;
};
export type MessageReactionCountAggregateInputType = {
    id?: true;
    messageId?: true;
    userId?: true;
    emoji?: true;
    createdAt?: true;
    _all?: true;
};
export type MessageReactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageReactionWhereInput;
    orderBy?: Prisma.MessageReactionOrderByWithRelationInput | Prisma.MessageReactionOrderByWithRelationInput[];
    cursor?: Prisma.MessageReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageReactionCountAggregateInputType;
    _avg?: MessageReactionAvgAggregateInputType;
    _sum?: MessageReactionSumAggregateInputType;
    _min?: MessageReactionMinAggregateInputType;
    _max?: MessageReactionMaxAggregateInputType;
};
export type GetMessageReactionAggregateType<T extends MessageReactionAggregateArgs> = {
    [P in keyof T & keyof AggregateMessageReaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessageReaction[P]> : Prisma.GetScalarType<T[P], AggregateMessageReaction[P]>;
};
export type MessageReactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageReactionWhereInput;
    orderBy?: Prisma.MessageReactionOrderByWithAggregationInput | Prisma.MessageReactionOrderByWithAggregationInput[];
    by: Prisma.MessageReactionScalarFieldEnum[] | Prisma.MessageReactionScalarFieldEnum;
    having?: Prisma.MessageReactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageReactionCountAggregateInputType | true;
    _avg?: MessageReactionAvgAggregateInputType;
    _sum?: MessageReactionSumAggregateInputType;
    _min?: MessageReactionMinAggregateInputType;
    _max?: MessageReactionMaxAggregateInputType;
};
export type MessageReactionGroupByOutputType = {
    id: number;
    messageId: number;
    userId: number;
    emoji: string;
    createdAt: Date;
    _count: MessageReactionCountAggregateOutputType | null;
    _avg: MessageReactionAvgAggregateOutputType | null;
    _sum: MessageReactionSumAggregateOutputType | null;
    _min: MessageReactionMinAggregateOutputType | null;
    _max: MessageReactionMaxAggregateOutputType | null;
};
type GetMessageReactionGroupByPayload<T extends MessageReactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageReactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageReactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageReactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageReactionGroupByOutputType[P]>;
}>>;
export type MessageReactionWhereInput = {
    AND?: Prisma.MessageReactionWhereInput | Prisma.MessageReactionWhereInput[];
    OR?: Prisma.MessageReactionWhereInput[];
    NOT?: Prisma.MessageReactionWhereInput | Prisma.MessageReactionWhereInput[];
    id?: Prisma.IntFilter<"MessageReaction"> | number;
    messageId?: Prisma.IntFilter<"MessageReaction"> | number;
    userId?: Prisma.IntFilter<"MessageReaction"> | number;
    emoji?: Prisma.StringFilter<"MessageReaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"MessageReaction"> | Date | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
};
export type MessageReactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    message?: Prisma.MessageOrderByWithRelationInput;
};
export type MessageReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    messageId_userId?: Prisma.MessageReactionMessageIdUserIdCompoundUniqueInput;
    AND?: Prisma.MessageReactionWhereInput | Prisma.MessageReactionWhereInput[];
    OR?: Prisma.MessageReactionWhereInput[];
    NOT?: Prisma.MessageReactionWhereInput | Prisma.MessageReactionWhereInput[];
    messageId?: Prisma.IntFilter<"MessageReaction"> | number;
    userId?: Prisma.IntFilter<"MessageReaction"> | number;
    emoji?: Prisma.StringFilter<"MessageReaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"MessageReaction"> | Date | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
}, "id" | "messageId_userId">;
export type MessageReactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MessageReactionCountOrderByAggregateInput;
    _avg?: Prisma.MessageReactionAvgOrderByAggregateInput;
    _max?: Prisma.MessageReactionMaxOrderByAggregateInput;
    _min?: Prisma.MessageReactionMinOrderByAggregateInput;
    _sum?: Prisma.MessageReactionSumOrderByAggregateInput;
};
export type MessageReactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageReactionScalarWhereWithAggregatesInput | Prisma.MessageReactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageReactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageReactionScalarWhereWithAggregatesInput | Prisma.MessageReactionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MessageReaction"> | number;
    messageId?: Prisma.IntWithAggregatesFilter<"MessageReaction"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"MessageReaction"> | number;
    emoji?: Prisma.StringWithAggregatesFilter<"MessageReaction"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MessageReaction"> | Date | string;
};
export type MessageReactionCreateInput = {
    userId: number;
    emoji: string;
    createdAt?: Date | string;
    message: Prisma.MessageCreateNestedOneWithoutReactionsInput;
};
export type MessageReactionUncheckedCreateInput = {
    id?: number;
    messageId: number;
    userId: number;
    emoji: string;
    createdAt?: Date | string;
};
export type MessageReactionUpdateInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    message?: Prisma.MessageUpdateOneRequiredWithoutReactionsNestedInput;
};
export type MessageReactionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    messageId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionCreateManyInput = {
    id?: number;
    messageId: number;
    userId: number;
    emoji: string;
    createdAt?: Date | string;
};
export type MessageReactionUpdateManyMutationInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    messageId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionListRelationFilter = {
    every?: Prisma.MessageReactionWhereInput;
    some?: Prisma.MessageReactionWhereInput;
    none?: Prisma.MessageReactionWhereInput;
};
export type MessageReactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MessageReactionMessageIdUserIdCompoundUniqueInput = {
    messageId: number;
    userId: number;
};
export type MessageReactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageReactionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type MessageReactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageReactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageReactionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type MessageReactionCreateNestedManyWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput> | Prisma.MessageReactionCreateWithoutMessageInput[] | Prisma.MessageReactionUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageReactionCreateOrConnectWithoutMessageInput | Prisma.MessageReactionCreateOrConnectWithoutMessageInput[];
    createMany?: Prisma.MessageReactionCreateManyMessageInputEnvelope;
    connect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
};
export type MessageReactionUncheckedCreateNestedManyWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput> | Prisma.MessageReactionCreateWithoutMessageInput[] | Prisma.MessageReactionUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageReactionCreateOrConnectWithoutMessageInput | Prisma.MessageReactionCreateOrConnectWithoutMessageInput[];
    createMany?: Prisma.MessageReactionCreateManyMessageInputEnvelope;
    connect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
};
export type MessageReactionUpdateManyWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput> | Prisma.MessageReactionCreateWithoutMessageInput[] | Prisma.MessageReactionUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageReactionCreateOrConnectWithoutMessageInput | Prisma.MessageReactionCreateOrConnectWithoutMessageInput[];
    upsert?: Prisma.MessageReactionUpsertWithWhereUniqueWithoutMessageInput | Prisma.MessageReactionUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: Prisma.MessageReactionCreateManyMessageInputEnvelope;
    set?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    disconnect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    delete?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    connect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    update?: Prisma.MessageReactionUpdateWithWhereUniqueWithoutMessageInput | Prisma.MessageReactionUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?: Prisma.MessageReactionUpdateManyWithWhereWithoutMessageInput | Prisma.MessageReactionUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: Prisma.MessageReactionScalarWhereInput | Prisma.MessageReactionScalarWhereInput[];
};
export type MessageReactionUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput> | Prisma.MessageReactionCreateWithoutMessageInput[] | Prisma.MessageReactionUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageReactionCreateOrConnectWithoutMessageInput | Prisma.MessageReactionCreateOrConnectWithoutMessageInput[];
    upsert?: Prisma.MessageReactionUpsertWithWhereUniqueWithoutMessageInput | Prisma.MessageReactionUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: Prisma.MessageReactionCreateManyMessageInputEnvelope;
    set?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    disconnect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    delete?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    connect?: Prisma.MessageReactionWhereUniqueInput | Prisma.MessageReactionWhereUniqueInput[];
    update?: Prisma.MessageReactionUpdateWithWhereUniqueWithoutMessageInput | Prisma.MessageReactionUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?: Prisma.MessageReactionUpdateManyWithWhereWithoutMessageInput | Prisma.MessageReactionUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: Prisma.MessageReactionScalarWhereInput | Prisma.MessageReactionScalarWhereInput[];
};
export type MessageReactionCreateWithoutMessageInput = {
    userId: number;
    emoji: string;
    createdAt?: Date | string;
};
export type MessageReactionUncheckedCreateWithoutMessageInput = {
    id?: number;
    userId: number;
    emoji: string;
    createdAt?: Date | string;
};
export type MessageReactionCreateOrConnectWithoutMessageInput = {
    where: Prisma.MessageReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput>;
};
export type MessageReactionCreateManyMessageInputEnvelope = {
    data: Prisma.MessageReactionCreateManyMessageInput | Prisma.MessageReactionCreateManyMessageInput[];
    skipDuplicates?: boolean;
};
export type MessageReactionUpsertWithWhereUniqueWithoutMessageInput = {
    where: Prisma.MessageReactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageReactionUpdateWithoutMessageInput, Prisma.MessageReactionUncheckedUpdateWithoutMessageInput>;
    create: Prisma.XOR<Prisma.MessageReactionCreateWithoutMessageInput, Prisma.MessageReactionUncheckedCreateWithoutMessageInput>;
};
export type MessageReactionUpdateWithWhereUniqueWithoutMessageInput = {
    where: Prisma.MessageReactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageReactionUpdateWithoutMessageInput, Prisma.MessageReactionUncheckedUpdateWithoutMessageInput>;
};
export type MessageReactionUpdateManyWithWhereWithoutMessageInput = {
    where: Prisma.MessageReactionScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageReactionUpdateManyMutationInput, Prisma.MessageReactionUncheckedUpdateManyWithoutMessageInput>;
};
export type MessageReactionScalarWhereInput = {
    AND?: Prisma.MessageReactionScalarWhereInput | Prisma.MessageReactionScalarWhereInput[];
    OR?: Prisma.MessageReactionScalarWhereInput[];
    NOT?: Prisma.MessageReactionScalarWhereInput | Prisma.MessageReactionScalarWhereInput[];
    id?: Prisma.IntFilter<"MessageReaction"> | number;
    messageId?: Prisma.IntFilter<"MessageReaction"> | number;
    userId?: Prisma.IntFilter<"MessageReaction"> | number;
    emoji?: Prisma.StringFilter<"MessageReaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"MessageReaction"> | Date | string;
};
export type MessageReactionCreateManyMessageInput = {
    id?: number;
    userId: number;
    emoji: string;
    createdAt?: Date | string;
};
export type MessageReactionUpdateWithoutMessageInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionUncheckedUpdateWithoutMessageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionUncheckedUpdateManyWithoutMessageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    emoji?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageReactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    userId?: boolean;
    emoji?: boolean;
    createdAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageReaction"]>;
export type MessageReactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    userId?: boolean;
    emoji?: boolean;
    createdAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageReaction"]>;
export type MessageReactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    userId?: boolean;
    emoji?: boolean;
    createdAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageReaction"]>;
export type MessageReactionSelectScalar = {
    id?: boolean;
    messageId?: boolean;
    userId?: boolean;
    emoji?: boolean;
    createdAt?: boolean;
};
export type MessageReactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "messageId" | "userId" | "emoji" | "createdAt", ExtArgs["result"]["messageReaction"]>;
export type MessageReactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
};
export type MessageReactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
};
export type MessageReactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
};
export type $MessageReactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MessageReaction";
    objects: {
        message: Prisma.$MessagePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        messageId: number;
        userId: number;
        emoji: string;
        createdAt: Date;
    }, ExtArgs["result"]["messageReaction"]>;
    composites: {};
};
export type MessageReactionGetPayload<S extends boolean | null | undefined | MessageReactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload, S>;
export type MessageReactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageReactionCountAggregateInputType | true;
};
export interface MessageReactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MessageReaction'];
        meta: {
            name: 'MessageReaction';
        };
    };
    findUnique<T extends MessageReactionFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageReactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageReactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageReactionFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageReactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageReactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageReactionFindManyArgs>(args?: Prisma.SelectSubset<T, MessageReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageReactionCreateArgs>(args: Prisma.SelectSubset<T, MessageReactionCreateArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageReactionCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MessageReactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MessageReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MessageReactionDeleteArgs>(args: Prisma.SelectSubset<T, MessageReactionDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageReactionUpdateArgs>(args: Prisma.SelectSubset<T, MessageReactionUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageReactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageReactionUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MessageReactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MessageReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MessageReactionUpsertArgs>(args: Prisma.SelectSubset<T, MessageReactionUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageReactionClient<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageReactionCountArgs>(args?: Prisma.Subset<T, MessageReactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageReactionCountAggregateOutputType> : number>;
    aggregate<T extends MessageReactionAggregateArgs>(args: Prisma.Subset<T, MessageReactionAggregateArgs>): Prisma.PrismaPromise<GetMessageReactionAggregateType<T>>;
    groupBy<T extends MessageReactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageReactionGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageReactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageReactionFieldRefs;
}
export interface Prisma__MessageReactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    message<T extends Prisma.MessageDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MessageDefaultArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageReactionFieldRefs {
    readonly id: Prisma.FieldRef<"MessageReaction", 'Int'>;
    readonly messageId: Prisma.FieldRef<"MessageReaction", 'Int'>;
    readonly userId: Prisma.FieldRef<"MessageReaction", 'Int'>;
    readonly emoji: Prisma.FieldRef<"MessageReaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MessageReaction", 'DateTime'>;
}
export type MessageReactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where: Prisma.MessageReactionWhereUniqueInput;
};
export type MessageReactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where: Prisma.MessageReactionWhereUniqueInput;
};
export type MessageReactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where?: Prisma.MessageReactionWhereInput;
    orderBy?: Prisma.MessageReactionOrderByWithRelationInput | Prisma.MessageReactionOrderByWithRelationInput[];
    cursor?: Prisma.MessageReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageReactionScalarFieldEnum | Prisma.MessageReactionScalarFieldEnum[];
};
export type MessageReactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where?: Prisma.MessageReactionWhereInput;
    orderBy?: Prisma.MessageReactionOrderByWithRelationInput | Prisma.MessageReactionOrderByWithRelationInput[];
    cursor?: Prisma.MessageReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageReactionScalarFieldEnum | Prisma.MessageReactionScalarFieldEnum[];
};
export type MessageReactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where?: Prisma.MessageReactionWhereInput;
    orderBy?: Prisma.MessageReactionOrderByWithRelationInput | Prisma.MessageReactionOrderByWithRelationInput[];
    cursor?: Prisma.MessageReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageReactionScalarFieldEnum | Prisma.MessageReactionScalarFieldEnum[];
};
export type MessageReactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageReactionCreateInput, Prisma.MessageReactionUncheckedCreateInput>;
};
export type MessageReactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageReactionCreateManyInput | Prisma.MessageReactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageReactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    data: Prisma.MessageReactionCreateManyInput | Prisma.MessageReactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MessageReactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MessageReactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageReactionUpdateInput, Prisma.MessageReactionUncheckedUpdateInput>;
    where: Prisma.MessageReactionWhereUniqueInput;
};
export type MessageReactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageReactionUpdateManyMutationInput, Prisma.MessageReactionUncheckedUpdateManyInput>;
    where?: Prisma.MessageReactionWhereInput;
    limit?: number;
};
export type MessageReactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageReactionUpdateManyMutationInput, Prisma.MessageReactionUncheckedUpdateManyInput>;
    where?: Prisma.MessageReactionWhereInput;
    limit?: number;
    include?: Prisma.MessageReactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MessageReactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where: Prisma.MessageReactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageReactionCreateInput, Prisma.MessageReactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageReactionUpdateInput, Prisma.MessageReactionUncheckedUpdateInput>;
};
export type MessageReactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
    where: Prisma.MessageReactionWhereUniqueInput;
};
export type MessageReactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageReactionWhereInput;
    limit?: number;
};
export type MessageReactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageReactionSelect<ExtArgs> | null;
    omit?: Prisma.MessageReactionOmit<ExtArgs> | null;
    include?: Prisma.MessageReactionInclude<ExtArgs> | null;
};
export {};
