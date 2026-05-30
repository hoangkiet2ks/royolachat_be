import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PollVoteModel = runtime.Types.Result.DefaultSelection<Prisma.$PollVotePayload>;
export type AggregatePollVote = {
    _count: PollVoteCountAggregateOutputType | null;
    _avg: PollVoteAvgAggregateOutputType | null;
    _sum: PollVoteSumAggregateOutputType | null;
    _min: PollVoteMinAggregateOutputType | null;
    _max: PollVoteMaxAggregateOutputType | null;
};
export type PollVoteAvgAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    optionId: number | null;
    userId: number | null;
};
export type PollVoteSumAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    optionId: number | null;
    userId: number | null;
};
export type PollVoteMinAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    optionId: number | null;
    userId: number | null;
    createdAt: Date | null;
};
export type PollVoteMaxAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    optionId: number | null;
    userId: number | null;
    createdAt: Date | null;
};
export type PollVoteCountAggregateOutputType = {
    id: number;
    pollId: number;
    optionId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type PollVoteAvgAggregateInputType = {
    id?: true;
    pollId?: true;
    optionId?: true;
    userId?: true;
};
export type PollVoteSumAggregateInputType = {
    id?: true;
    pollId?: true;
    optionId?: true;
    userId?: true;
};
export type PollVoteMinAggregateInputType = {
    id?: true;
    pollId?: true;
    optionId?: true;
    userId?: true;
    createdAt?: true;
};
export type PollVoteMaxAggregateInputType = {
    id?: true;
    pollId?: true;
    optionId?: true;
    userId?: true;
    createdAt?: true;
};
export type PollVoteCountAggregateInputType = {
    id?: true;
    pollId?: true;
    optionId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type PollVoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithRelationInput | Prisma.PollVoteOrderByWithRelationInput[];
    cursor?: Prisma.PollVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PollVoteCountAggregateInputType;
    _avg?: PollVoteAvgAggregateInputType;
    _sum?: PollVoteSumAggregateInputType;
    _min?: PollVoteMinAggregateInputType;
    _max?: PollVoteMaxAggregateInputType;
};
export type GetPollVoteAggregateType<T extends PollVoteAggregateArgs> = {
    [P in keyof T & keyof AggregatePollVote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePollVote[P]> : Prisma.GetScalarType<T[P], AggregatePollVote[P]>;
};
export type PollVoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithAggregationInput | Prisma.PollVoteOrderByWithAggregationInput[];
    by: Prisma.PollVoteScalarFieldEnum[] | Prisma.PollVoteScalarFieldEnum;
    having?: Prisma.PollVoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PollVoteCountAggregateInputType | true;
    _avg?: PollVoteAvgAggregateInputType;
    _sum?: PollVoteSumAggregateInputType;
    _min?: PollVoteMinAggregateInputType;
    _max?: PollVoteMaxAggregateInputType;
};
export type PollVoteGroupByOutputType = {
    id: number;
    pollId: number;
    optionId: number;
    userId: number;
    createdAt: Date;
    _count: PollVoteCountAggregateOutputType | null;
    _avg: PollVoteAvgAggregateOutputType | null;
    _sum: PollVoteSumAggregateOutputType | null;
    _min: PollVoteMinAggregateOutputType | null;
    _max: PollVoteMaxAggregateOutputType | null;
};
type GetPollVoteGroupByPayload<T extends PollVoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PollVoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PollVoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PollVoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PollVoteGroupByOutputType[P]>;
}>>;
export type PollVoteWhereInput = {
    AND?: Prisma.PollVoteWhereInput | Prisma.PollVoteWhereInput[];
    OR?: Prisma.PollVoteWhereInput[];
    NOT?: Prisma.PollVoteWhereInput | Prisma.PollVoteWhereInput[];
    id?: Prisma.IntFilter<"PollVote"> | number;
    pollId?: Prisma.IntFilter<"PollVote"> | number;
    optionId?: Prisma.IntFilter<"PollVote"> | number;
    userId?: Prisma.IntFilter<"PollVote"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollVote"> | Date | string;
    option?: Prisma.XOR<Prisma.PollOptionScalarRelationFilter, Prisma.PollOptionWhereInput>;
};
export type PollVoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    option?: Prisma.PollOptionOrderByWithRelationInput;
};
export type PollVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    optionId_userId?: Prisma.PollVoteOptionIdUserIdCompoundUniqueInput;
    AND?: Prisma.PollVoteWhereInput | Prisma.PollVoteWhereInput[];
    OR?: Prisma.PollVoteWhereInput[];
    NOT?: Prisma.PollVoteWhereInput | Prisma.PollVoteWhereInput[];
    pollId?: Prisma.IntFilter<"PollVote"> | number;
    optionId?: Prisma.IntFilter<"PollVote"> | number;
    userId?: Prisma.IntFilter<"PollVote"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollVote"> | Date | string;
    option?: Prisma.XOR<Prisma.PollOptionScalarRelationFilter, Prisma.PollOptionWhereInput>;
}, "id" | "optionId_userId">;
export type PollVoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PollVoteCountOrderByAggregateInput;
    _avg?: Prisma.PollVoteAvgOrderByAggregateInput;
    _max?: Prisma.PollVoteMaxOrderByAggregateInput;
    _min?: Prisma.PollVoteMinOrderByAggregateInput;
    _sum?: Prisma.PollVoteSumOrderByAggregateInput;
};
export type PollVoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.PollVoteScalarWhereWithAggregatesInput | Prisma.PollVoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.PollVoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PollVoteScalarWhereWithAggregatesInput | Prisma.PollVoteScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PollVote"> | number;
    pollId?: Prisma.IntWithAggregatesFilter<"PollVote"> | number;
    optionId?: Prisma.IntWithAggregatesFilter<"PollVote"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"PollVote"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PollVote"> | Date | string;
};
export type PollVoteCreateInput = {
    pollId: number;
    userId: number;
    createdAt?: Date | string;
    option: Prisma.PollOptionCreateNestedOneWithoutVotesInput;
};
export type PollVoteUncheckedCreateInput = {
    id?: number;
    pollId: number;
    optionId: number;
    userId: number;
    createdAt?: Date | string;
};
export type PollVoteUpdateInput = {
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    option?: Prisma.PollOptionUpdateOneRequiredWithoutVotesNestedInput;
};
export type PollVoteUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    optionId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteCreateManyInput = {
    id?: number;
    pollId: number;
    optionId: number;
    userId: number;
    createdAt?: Date | string;
};
export type PollVoteUpdateManyMutationInput = {
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    optionId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteListRelationFilter = {
    every?: Prisma.PollVoteWhereInput;
    some?: Prisma.PollVoteWhereInput;
    none?: Prisma.PollVoteWhereInput;
};
export type PollVoteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PollVoteOptionIdUserIdCompoundUniqueInput = {
    optionId: number;
    userId: number;
};
export type PollVoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollVoteAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PollVoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollVoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollVoteSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    optionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PollVoteCreateNestedManyWithoutOptionInput = {
    create?: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput> | Prisma.PollVoteCreateWithoutOptionInput[] | Prisma.PollVoteUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.PollVoteCreateOrConnectWithoutOptionInput | Prisma.PollVoteCreateOrConnectWithoutOptionInput[];
    createMany?: Prisma.PollVoteCreateManyOptionInputEnvelope;
    connect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
};
export type PollVoteUncheckedCreateNestedManyWithoutOptionInput = {
    create?: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput> | Prisma.PollVoteCreateWithoutOptionInput[] | Prisma.PollVoteUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.PollVoteCreateOrConnectWithoutOptionInput | Prisma.PollVoteCreateOrConnectWithoutOptionInput[];
    createMany?: Prisma.PollVoteCreateManyOptionInputEnvelope;
    connect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
};
export type PollVoteUpdateManyWithoutOptionNestedInput = {
    create?: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput> | Prisma.PollVoteCreateWithoutOptionInput[] | Prisma.PollVoteUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.PollVoteCreateOrConnectWithoutOptionInput | Prisma.PollVoteCreateOrConnectWithoutOptionInput[];
    upsert?: Prisma.PollVoteUpsertWithWhereUniqueWithoutOptionInput | Prisma.PollVoteUpsertWithWhereUniqueWithoutOptionInput[];
    createMany?: Prisma.PollVoteCreateManyOptionInputEnvelope;
    set?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    disconnect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    delete?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    connect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    update?: Prisma.PollVoteUpdateWithWhereUniqueWithoutOptionInput | Prisma.PollVoteUpdateWithWhereUniqueWithoutOptionInput[];
    updateMany?: Prisma.PollVoteUpdateManyWithWhereWithoutOptionInput | Prisma.PollVoteUpdateManyWithWhereWithoutOptionInput[];
    deleteMany?: Prisma.PollVoteScalarWhereInput | Prisma.PollVoteScalarWhereInput[];
};
export type PollVoteUncheckedUpdateManyWithoutOptionNestedInput = {
    create?: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput> | Prisma.PollVoteCreateWithoutOptionInput[] | Prisma.PollVoteUncheckedCreateWithoutOptionInput[];
    connectOrCreate?: Prisma.PollVoteCreateOrConnectWithoutOptionInput | Prisma.PollVoteCreateOrConnectWithoutOptionInput[];
    upsert?: Prisma.PollVoteUpsertWithWhereUniqueWithoutOptionInput | Prisma.PollVoteUpsertWithWhereUniqueWithoutOptionInput[];
    createMany?: Prisma.PollVoteCreateManyOptionInputEnvelope;
    set?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    disconnect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    delete?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    connect?: Prisma.PollVoteWhereUniqueInput | Prisma.PollVoteWhereUniqueInput[];
    update?: Prisma.PollVoteUpdateWithWhereUniqueWithoutOptionInput | Prisma.PollVoteUpdateWithWhereUniqueWithoutOptionInput[];
    updateMany?: Prisma.PollVoteUpdateManyWithWhereWithoutOptionInput | Prisma.PollVoteUpdateManyWithWhereWithoutOptionInput[];
    deleteMany?: Prisma.PollVoteScalarWhereInput | Prisma.PollVoteScalarWhereInput[];
};
export type PollVoteCreateWithoutOptionInput = {
    pollId: number;
    userId: number;
    createdAt?: Date | string;
};
export type PollVoteUncheckedCreateWithoutOptionInput = {
    id?: number;
    pollId: number;
    userId: number;
    createdAt?: Date | string;
};
export type PollVoteCreateOrConnectWithoutOptionInput = {
    where: Prisma.PollVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput>;
};
export type PollVoteCreateManyOptionInputEnvelope = {
    data: Prisma.PollVoteCreateManyOptionInput | Prisma.PollVoteCreateManyOptionInput[];
    skipDuplicates?: boolean;
};
export type PollVoteUpsertWithWhereUniqueWithoutOptionInput = {
    where: Prisma.PollVoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.PollVoteUpdateWithoutOptionInput, Prisma.PollVoteUncheckedUpdateWithoutOptionInput>;
    create: Prisma.XOR<Prisma.PollVoteCreateWithoutOptionInput, Prisma.PollVoteUncheckedCreateWithoutOptionInput>;
};
export type PollVoteUpdateWithWhereUniqueWithoutOptionInput = {
    where: Prisma.PollVoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.PollVoteUpdateWithoutOptionInput, Prisma.PollVoteUncheckedUpdateWithoutOptionInput>;
};
export type PollVoteUpdateManyWithWhereWithoutOptionInput = {
    where: Prisma.PollVoteScalarWhereInput;
    data: Prisma.XOR<Prisma.PollVoteUpdateManyMutationInput, Prisma.PollVoteUncheckedUpdateManyWithoutOptionInput>;
};
export type PollVoteScalarWhereInput = {
    AND?: Prisma.PollVoteScalarWhereInput | Prisma.PollVoteScalarWhereInput[];
    OR?: Prisma.PollVoteScalarWhereInput[];
    NOT?: Prisma.PollVoteScalarWhereInput | Prisma.PollVoteScalarWhereInput[];
    id?: Prisma.IntFilter<"PollVote"> | number;
    pollId?: Prisma.IntFilter<"PollVote"> | number;
    optionId?: Prisma.IntFilter<"PollVote"> | number;
    userId?: Prisma.IntFilter<"PollVote"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollVote"> | Date | string;
};
export type PollVoteCreateManyOptionInput = {
    id?: number;
    pollId: number;
    userId: number;
    createdAt?: Date | string;
};
export type PollVoteUpdateWithoutOptionInput = {
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteUncheckedUpdateWithoutOptionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteUncheckedUpdateManyWithoutOptionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollVoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    optionId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollVote"]>;
export type PollVoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    optionId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollVote"]>;
export type PollVoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    optionId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollVote"]>;
export type PollVoteSelectScalar = {
    id?: boolean;
    pollId?: boolean;
    optionId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type PollVoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pollId" | "optionId" | "userId" | "createdAt", ExtArgs["result"]["pollVote"]>;
export type PollVoteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
};
export type PollVoteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
};
export type PollVoteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    option?: boolean | Prisma.PollOptionDefaultArgs<ExtArgs>;
};
export type $PollVotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PollVote";
    objects: {
        option: Prisma.$PollOptionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        pollId: number;
        optionId: number;
        userId: number;
        createdAt: Date;
    }, ExtArgs["result"]["pollVote"]>;
    composites: {};
};
export type PollVoteGetPayload<S extends boolean | null | undefined | PollVoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PollVotePayload, S>;
export type PollVoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PollVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PollVoteCountAggregateInputType | true;
};
export interface PollVoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PollVote'];
        meta: {
            name: 'PollVote';
        };
    };
    findUnique<T extends PollVoteFindUniqueArgs>(args: Prisma.SelectSubset<T, PollVoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PollVoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PollVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PollVoteFindFirstArgs>(args?: Prisma.SelectSubset<T, PollVoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PollVoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PollVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PollVoteFindManyArgs>(args?: Prisma.SelectSubset<T, PollVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PollVoteCreateArgs>(args: Prisma.SelectSubset<T, PollVoteCreateArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PollVoteCreateManyArgs>(args?: Prisma.SelectSubset<T, PollVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PollVoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PollVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PollVoteDeleteArgs>(args: Prisma.SelectSubset<T, PollVoteDeleteArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PollVoteUpdateArgs>(args: Prisma.SelectSubset<T, PollVoteUpdateArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PollVoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, PollVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PollVoteUpdateManyArgs>(args: Prisma.SelectSubset<T, PollVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PollVoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PollVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PollVoteUpsertArgs>(args: Prisma.SelectSubset<T, PollVoteUpsertArgs<ExtArgs>>): Prisma.Prisma__PollVoteClient<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PollVoteCountArgs>(args?: Prisma.Subset<T, PollVoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PollVoteCountAggregateOutputType> : number>;
    aggregate<T extends PollVoteAggregateArgs>(args: Prisma.Subset<T, PollVoteAggregateArgs>): Prisma.PrismaPromise<GetPollVoteAggregateType<T>>;
    groupBy<T extends PollVoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PollVoteGroupByArgs['orderBy'];
    } : {
        orderBy?: PollVoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PollVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPollVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PollVoteFieldRefs;
}
export interface Prisma__PollVoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    option<T extends Prisma.PollOptionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PollOptionDefaultArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PollVoteFieldRefs {
    readonly id: Prisma.FieldRef<"PollVote", 'Int'>;
    readonly pollId: Prisma.FieldRef<"PollVote", 'Int'>;
    readonly optionId: Prisma.FieldRef<"PollVote", 'Int'>;
    readonly userId: Prisma.FieldRef<"PollVote", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"PollVote", 'DateTime'>;
}
export type PollVoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where: Prisma.PollVoteWhereUniqueInput;
};
export type PollVoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where: Prisma.PollVoteWhereUniqueInput;
};
export type PollVoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithRelationInput | Prisma.PollVoteOrderByWithRelationInput[];
    cursor?: Prisma.PollVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollVoteScalarFieldEnum | Prisma.PollVoteScalarFieldEnum[];
};
export type PollVoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithRelationInput | Prisma.PollVoteOrderByWithRelationInput[];
    cursor?: Prisma.PollVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollVoteScalarFieldEnum | Prisma.PollVoteScalarFieldEnum[];
};
export type PollVoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where?: Prisma.PollVoteWhereInput;
    orderBy?: Prisma.PollVoteOrderByWithRelationInput | Prisma.PollVoteOrderByWithRelationInput[];
    cursor?: Prisma.PollVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PollVoteScalarFieldEnum | Prisma.PollVoteScalarFieldEnum[];
};
export type PollVoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollVoteCreateInput, Prisma.PollVoteUncheckedCreateInput>;
};
export type PollVoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PollVoteCreateManyInput | Prisma.PollVoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PollVoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    data: Prisma.PollVoteCreateManyInput | Prisma.PollVoteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PollVoteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PollVoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollVoteUpdateInput, Prisma.PollVoteUncheckedUpdateInput>;
    where: Prisma.PollVoteWhereUniqueInput;
};
export type PollVoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PollVoteUpdateManyMutationInput, Prisma.PollVoteUncheckedUpdateManyInput>;
    where?: Prisma.PollVoteWhereInput;
    limit?: number;
};
export type PollVoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollVoteUpdateManyMutationInput, Prisma.PollVoteUncheckedUpdateManyInput>;
    where?: Prisma.PollVoteWhereInput;
    limit?: number;
    include?: Prisma.PollVoteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PollVoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where: Prisma.PollVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollVoteCreateInput, Prisma.PollVoteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PollVoteUpdateInput, Prisma.PollVoteUncheckedUpdateInput>;
};
export type PollVoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
    where: Prisma.PollVoteWhereUniqueInput;
};
export type PollVoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollVoteWhereInput;
    limit?: number;
};
export type PollVoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollVoteSelect<ExtArgs> | null;
    omit?: Prisma.PollVoteOmit<ExtArgs> | null;
    include?: Prisma.PollVoteInclude<ExtArgs> | null;
};
export {};
