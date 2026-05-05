import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BotModeratorModel = runtime.Types.Result.DefaultSelection<Prisma.$BotModeratorPayload>;
export type AggregateBotModerator = {
    _count: BotModeratorCountAggregateOutputType | null;
    _avg: BotModeratorAvgAggregateOutputType | null;
    _sum: BotModeratorSumAggregateOutputType | null;
    _min: BotModeratorMinAggregateOutputType | null;
    _max: BotModeratorMaxAggregateOutputType | null;
};
export type BotModeratorAvgAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    enabledBy: number | null;
};
export type BotModeratorSumAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    enabledBy: number | null;
};
export type BotModeratorMinAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    isEnabled: boolean | null;
    enabledBy: number | null;
    enabledAt: Date | null;
    updatedAt: Date | null;
};
export type BotModeratorMaxAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    isEnabled: boolean | null;
    enabledBy: number | null;
    enabledAt: Date | null;
    updatedAt: Date | null;
};
export type BotModeratorCountAggregateOutputType = {
    id: number;
    conversationId: number;
    isEnabled: number;
    enabledBy: number;
    enabledAt: number;
    updatedAt: number;
    _all: number;
};
export type BotModeratorAvgAggregateInputType = {
    id?: true;
    conversationId?: true;
    enabledBy?: true;
};
export type BotModeratorSumAggregateInputType = {
    id?: true;
    conversationId?: true;
    enabledBy?: true;
};
export type BotModeratorMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    isEnabled?: true;
    enabledBy?: true;
    enabledAt?: true;
    updatedAt?: true;
};
export type BotModeratorMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    isEnabled?: true;
    enabledBy?: true;
    enabledAt?: true;
    updatedAt?: true;
};
export type BotModeratorCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    isEnabled?: true;
    enabledBy?: true;
    enabledAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BotModeratorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotModeratorWhereInput;
    orderBy?: Prisma.BotModeratorOrderByWithRelationInput | Prisma.BotModeratorOrderByWithRelationInput[];
    cursor?: Prisma.BotModeratorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BotModeratorCountAggregateInputType;
    _avg?: BotModeratorAvgAggregateInputType;
    _sum?: BotModeratorSumAggregateInputType;
    _min?: BotModeratorMinAggregateInputType;
    _max?: BotModeratorMaxAggregateInputType;
};
export type GetBotModeratorAggregateType<T extends BotModeratorAggregateArgs> = {
    [P in keyof T & keyof AggregateBotModerator]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBotModerator[P]> : Prisma.GetScalarType<T[P], AggregateBotModerator[P]>;
};
export type BotModeratorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotModeratorWhereInput;
    orderBy?: Prisma.BotModeratorOrderByWithAggregationInput | Prisma.BotModeratorOrderByWithAggregationInput[];
    by: Prisma.BotModeratorScalarFieldEnum[] | Prisma.BotModeratorScalarFieldEnum;
    having?: Prisma.BotModeratorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BotModeratorCountAggregateInputType | true;
    _avg?: BotModeratorAvgAggregateInputType;
    _sum?: BotModeratorSumAggregateInputType;
    _min?: BotModeratorMinAggregateInputType;
    _max?: BotModeratorMaxAggregateInputType;
};
export type BotModeratorGroupByOutputType = {
    id: number;
    conversationId: number;
    isEnabled: boolean;
    enabledBy: number;
    enabledAt: Date;
    updatedAt: Date;
    _count: BotModeratorCountAggregateOutputType | null;
    _avg: BotModeratorAvgAggregateOutputType | null;
    _sum: BotModeratorSumAggregateOutputType | null;
    _min: BotModeratorMinAggregateOutputType | null;
    _max: BotModeratorMaxAggregateOutputType | null;
};
type GetBotModeratorGroupByPayload<T extends BotModeratorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BotModeratorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BotModeratorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BotModeratorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BotModeratorGroupByOutputType[P]>;
}>>;
export type BotModeratorWhereInput = {
    AND?: Prisma.BotModeratorWhereInput | Prisma.BotModeratorWhereInput[];
    OR?: Prisma.BotModeratorWhereInput[];
    NOT?: Prisma.BotModeratorWhereInput | Prisma.BotModeratorWhereInput[];
    id?: Prisma.IntFilter<"BotModerator"> | number;
    conversationId?: Prisma.IntFilter<"BotModerator"> | number;
    isEnabled?: Prisma.BoolFilter<"BotModerator"> | boolean;
    enabledBy?: Prisma.IntFilter<"BotModerator"> | number;
    enabledAt?: Prisma.DateTimeFilter<"BotModerator"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BotModerator"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
};
export type BotModeratorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
    enabledAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
};
export type BotModeratorWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    conversationId?: number;
    AND?: Prisma.BotModeratorWhereInput | Prisma.BotModeratorWhereInput[];
    OR?: Prisma.BotModeratorWhereInput[];
    NOT?: Prisma.BotModeratorWhereInput | Prisma.BotModeratorWhereInput[];
    isEnabled?: Prisma.BoolFilter<"BotModerator"> | boolean;
    enabledBy?: Prisma.IntFilter<"BotModerator"> | number;
    enabledAt?: Prisma.DateTimeFilter<"BotModerator"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BotModerator"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
}, "id" | "conversationId">;
export type BotModeratorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
    enabledAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BotModeratorCountOrderByAggregateInput;
    _avg?: Prisma.BotModeratorAvgOrderByAggregateInput;
    _max?: Prisma.BotModeratorMaxOrderByAggregateInput;
    _min?: Prisma.BotModeratorMinOrderByAggregateInput;
    _sum?: Prisma.BotModeratorSumOrderByAggregateInput;
};
export type BotModeratorScalarWhereWithAggregatesInput = {
    AND?: Prisma.BotModeratorScalarWhereWithAggregatesInput | Prisma.BotModeratorScalarWhereWithAggregatesInput[];
    OR?: Prisma.BotModeratorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BotModeratorScalarWhereWithAggregatesInput | Prisma.BotModeratorScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"BotModerator"> | number;
    conversationId?: Prisma.IntWithAggregatesFilter<"BotModerator"> | number;
    isEnabled?: Prisma.BoolWithAggregatesFilter<"BotModerator"> | boolean;
    enabledBy?: Prisma.IntWithAggregatesFilter<"BotModerator"> | number;
    enabledAt?: Prisma.DateTimeWithAggregatesFilter<"BotModerator"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BotModerator"> | Date | string;
};
export type BotModeratorCreateInput = {
    isEnabled?: boolean;
    enabledBy: number;
    enabledAt?: Date | string;
    updatedAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutBotModeratorInput;
};
export type BotModeratorUncheckedCreateInput = {
    id?: number;
    conversationId: number;
    isEnabled?: boolean;
    enabledBy: number;
    enabledAt?: Date | string;
    updatedAt?: Date | string;
};
export type BotModeratorUpdateInput = {
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutBotModeratorNestedInput;
};
export type BotModeratorUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BotModeratorCreateManyInput = {
    id?: number;
    conversationId: number;
    isEnabled?: boolean;
    enabledBy: number;
    enabledAt?: Date | string;
    updatedAt?: Date | string;
};
export type BotModeratorUpdateManyMutationInput = {
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BotModeratorUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BotModeratorNullableScalarRelationFilter = {
    is?: Prisma.BotModeratorWhereInput | null;
    isNot?: Prisma.BotModeratorWhereInput | null;
};
export type BotModeratorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
    enabledAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BotModeratorAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
};
export type BotModeratorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
    enabledAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BotModeratorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    isEnabled?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
    enabledAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BotModeratorSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    enabledBy?: Prisma.SortOrder;
};
export type BotModeratorCreateNestedOneWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
    connectOrCreate?: Prisma.BotModeratorCreateOrConnectWithoutConversationInput;
    connect?: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorUncheckedCreateNestedOneWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
    connectOrCreate?: Prisma.BotModeratorCreateOrConnectWithoutConversationInput;
    connect?: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorUpdateOneWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
    connectOrCreate?: Prisma.BotModeratorCreateOrConnectWithoutConversationInput;
    upsert?: Prisma.BotModeratorUpsertWithoutConversationInput;
    disconnect?: Prisma.BotModeratorWhereInput | boolean;
    delete?: Prisma.BotModeratorWhereInput | boolean;
    connect?: Prisma.BotModeratorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BotModeratorUpdateToOneWithWhereWithoutConversationInput, Prisma.BotModeratorUpdateWithoutConversationInput>, Prisma.BotModeratorUncheckedUpdateWithoutConversationInput>;
};
export type BotModeratorUncheckedUpdateOneWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
    connectOrCreate?: Prisma.BotModeratorCreateOrConnectWithoutConversationInput;
    upsert?: Prisma.BotModeratorUpsertWithoutConversationInput;
    disconnect?: Prisma.BotModeratorWhereInput | boolean;
    delete?: Prisma.BotModeratorWhereInput | boolean;
    connect?: Prisma.BotModeratorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BotModeratorUpdateToOneWithWhereWithoutConversationInput, Prisma.BotModeratorUpdateWithoutConversationInput>, Prisma.BotModeratorUncheckedUpdateWithoutConversationInput>;
};
export type BotModeratorCreateWithoutConversationInput = {
    isEnabled?: boolean;
    enabledBy: number;
    enabledAt?: Date | string;
    updatedAt?: Date | string;
};
export type BotModeratorUncheckedCreateWithoutConversationInput = {
    id?: number;
    isEnabled?: boolean;
    enabledBy: number;
    enabledAt?: Date | string;
    updatedAt?: Date | string;
};
export type BotModeratorCreateOrConnectWithoutConversationInput = {
    where: Prisma.BotModeratorWhereUniqueInput;
    create: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
};
export type BotModeratorUpsertWithoutConversationInput = {
    update: Prisma.XOR<Prisma.BotModeratorUpdateWithoutConversationInput, Prisma.BotModeratorUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.BotModeratorCreateWithoutConversationInput, Prisma.BotModeratorUncheckedCreateWithoutConversationInput>;
    where?: Prisma.BotModeratorWhereInput;
};
export type BotModeratorUpdateToOneWithWhereWithoutConversationInput = {
    where?: Prisma.BotModeratorWhereInput;
    data: Prisma.XOR<Prisma.BotModeratorUpdateWithoutConversationInput, Prisma.BotModeratorUncheckedUpdateWithoutConversationInput>;
};
export type BotModeratorUpdateWithoutConversationInput = {
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BotModeratorUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    isEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    enabledBy?: Prisma.IntFieldUpdateOperationsInput | number;
    enabledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BotModeratorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    isEnabled?: boolean;
    enabledBy?: boolean;
    enabledAt?: boolean;
    updatedAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["botModerator"]>;
export type BotModeratorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    isEnabled?: boolean;
    enabledBy?: boolean;
    enabledAt?: boolean;
    updatedAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["botModerator"]>;
export type BotModeratorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    isEnabled?: boolean;
    enabledBy?: boolean;
    enabledAt?: boolean;
    updatedAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["botModerator"]>;
export type BotModeratorSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    isEnabled?: boolean;
    enabledBy?: boolean;
    enabledAt?: boolean;
    updatedAt?: boolean;
};
export type BotModeratorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "conversationId" | "isEnabled" | "enabledBy" | "enabledAt" | "updatedAt", ExtArgs["result"]["botModerator"]>;
export type BotModeratorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type BotModeratorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type BotModeratorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type $BotModeratorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BotModerator";
    objects: {
        conversation: Prisma.$ConversationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        conversationId: number;
        isEnabled: boolean;
        enabledBy: number;
        enabledAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["botModerator"]>;
    composites: {};
};
export type BotModeratorGetPayload<S extends boolean | null | undefined | BotModeratorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload, S>;
export type BotModeratorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BotModeratorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BotModeratorCountAggregateInputType | true;
};
export interface BotModeratorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BotModerator'];
        meta: {
            name: 'BotModerator';
        };
    };
    findUnique<T extends BotModeratorFindUniqueArgs>(args: Prisma.SelectSubset<T, BotModeratorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BotModeratorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BotModeratorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BotModeratorFindFirstArgs>(args?: Prisma.SelectSubset<T, BotModeratorFindFirstArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BotModeratorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BotModeratorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BotModeratorFindManyArgs>(args?: Prisma.SelectSubset<T, BotModeratorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BotModeratorCreateArgs>(args: Prisma.SelectSubset<T, BotModeratorCreateArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BotModeratorCreateManyArgs>(args?: Prisma.SelectSubset<T, BotModeratorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BotModeratorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BotModeratorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BotModeratorDeleteArgs>(args: Prisma.SelectSubset<T, BotModeratorDeleteArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BotModeratorUpdateArgs>(args: Prisma.SelectSubset<T, BotModeratorUpdateArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BotModeratorDeleteManyArgs>(args?: Prisma.SelectSubset<T, BotModeratorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BotModeratorUpdateManyArgs>(args: Prisma.SelectSubset<T, BotModeratorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BotModeratorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BotModeratorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BotModeratorUpsertArgs>(args: Prisma.SelectSubset<T, BotModeratorUpsertArgs<ExtArgs>>): Prisma.Prisma__BotModeratorClient<runtime.Types.Result.GetResult<Prisma.$BotModeratorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BotModeratorCountArgs>(args?: Prisma.Subset<T, BotModeratorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BotModeratorCountAggregateOutputType> : number>;
    aggregate<T extends BotModeratorAggregateArgs>(args: Prisma.Subset<T, BotModeratorAggregateArgs>): Prisma.PrismaPromise<GetBotModeratorAggregateType<T>>;
    groupBy<T extends BotModeratorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BotModeratorGroupByArgs['orderBy'];
    } : {
        orderBy?: BotModeratorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BotModeratorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotModeratorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BotModeratorFieldRefs;
}
export interface Prisma__BotModeratorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BotModeratorFieldRefs {
    readonly id: Prisma.FieldRef<"BotModerator", 'Int'>;
    readonly conversationId: Prisma.FieldRef<"BotModerator", 'Int'>;
    readonly isEnabled: Prisma.FieldRef<"BotModerator", 'Boolean'>;
    readonly enabledBy: Prisma.FieldRef<"BotModerator", 'Int'>;
    readonly enabledAt: Prisma.FieldRef<"BotModerator", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BotModerator", 'DateTime'>;
}
export type BotModeratorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where?: Prisma.BotModeratorWhereInput;
    orderBy?: Prisma.BotModeratorOrderByWithRelationInput | Prisma.BotModeratorOrderByWithRelationInput[];
    cursor?: Prisma.BotModeratorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotModeratorScalarFieldEnum | Prisma.BotModeratorScalarFieldEnum[];
};
export type BotModeratorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where?: Prisma.BotModeratorWhereInput;
    orderBy?: Prisma.BotModeratorOrderByWithRelationInput | Prisma.BotModeratorOrderByWithRelationInput[];
    cursor?: Prisma.BotModeratorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotModeratorScalarFieldEnum | Prisma.BotModeratorScalarFieldEnum[];
};
export type BotModeratorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where?: Prisma.BotModeratorWhereInput;
    orderBy?: Prisma.BotModeratorOrderByWithRelationInput | Prisma.BotModeratorOrderByWithRelationInput[];
    cursor?: Prisma.BotModeratorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotModeratorScalarFieldEnum | Prisma.BotModeratorScalarFieldEnum[];
};
export type BotModeratorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotModeratorCreateInput, Prisma.BotModeratorUncheckedCreateInput>;
};
export type BotModeratorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BotModeratorCreateManyInput | Prisma.BotModeratorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BotModeratorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    data: Prisma.BotModeratorCreateManyInput | Prisma.BotModeratorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BotModeratorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BotModeratorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotModeratorUpdateInput, Prisma.BotModeratorUncheckedUpdateInput>;
    where: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BotModeratorUpdateManyMutationInput, Prisma.BotModeratorUncheckedUpdateManyInput>;
    where?: Prisma.BotModeratorWhereInput;
    limit?: number;
};
export type BotModeratorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotModeratorUpdateManyMutationInput, Prisma.BotModeratorUncheckedUpdateManyInput>;
    where?: Prisma.BotModeratorWhereInput;
    limit?: number;
    include?: Prisma.BotModeratorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BotModeratorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where: Prisma.BotModeratorWhereUniqueInput;
    create: Prisma.XOR<Prisma.BotModeratorCreateInput, Prisma.BotModeratorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BotModeratorUpdateInput, Prisma.BotModeratorUncheckedUpdateInput>;
};
export type BotModeratorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
    where: Prisma.BotModeratorWhereUniqueInput;
};
export type BotModeratorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotModeratorWhereInput;
    limit?: number;
};
export type BotModeratorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotModeratorSelect<ExtArgs> | null;
    omit?: Prisma.BotModeratorOmit<ExtArgs> | null;
    include?: Prisma.BotModeratorInclude<ExtArgs> | null;
};
export {};
