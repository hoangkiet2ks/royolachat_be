import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PollOptionModel = runtime.Types.Result.DefaultSelection<Prisma.$PollOptionPayload>;
export type AggregatePollOption = {
    _count: PollOptionCountAggregateOutputType | null;
    _avg: PollOptionAvgAggregateOutputType | null;
    _sum: PollOptionSumAggregateOutputType | null;
    _min: PollOptionMinAggregateOutputType | null;
    _max: PollOptionMaxAggregateOutputType | null;
};
export type PollOptionAvgAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    order: number | null;
};
export type PollOptionSumAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    order: number | null;
};
export type PollOptionMinAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    text: string | null;
    order: number | null;
    createdAt: Date | null;
};
export type PollOptionMaxAggregateOutputType = {
    id: number | null;
    pollId: number | null;
    text: string | null;
    order: number | null;
    createdAt: Date | null;
};
export type PollOptionCountAggregateOutputType = {
    id: number;
    pollId: number;
    text: number;
    order: number;
    createdAt: number;
    _all: number;
};
export type PollOptionAvgAggregateInputType = {
    id?: true;
    pollId?: true;
    order?: true;
};
export type PollOptionSumAggregateInputType = {
    id?: true;
    pollId?: true;
    order?: true;
};
export type PollOptionMinAggregateInputType = {
    id?: true;
    pollId?: true;
    text?: true;
    order?: true;
    createdAt?: true;
};
export type PollOptionMaxAggregateInputType = {
    id?: true;
    pollId?: true;
    text?: true;
    order?: true;
    createdAt?: true;
};
export type PollOptionCountAggregateInputType = {
    id?: true;
    pollId?: true;
    text?: true;
    order?: true;
    createdAt?: true;
    _all?: true;
};
export type PollOptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollOptionWhereInput;
    orderBy?: Prisma.PollOptionOrderByWithRelationInput | Prisma.PollOptionOrderByWithRelationInput[];
    cursor?: Prisma.PollOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PollOptionCountAggregateInputType;
    _avg?: PollOptionAvgAggregateInputType;
    _sum?: PollOptionSumAggregateInputType;
    _min?: PollOptionMinAggregateInputType;
    _max?: PollOptionMaxAggregateInputType;
};
export type GetPollOptionAggregateType<T extends PollOptionAggregateArgs> = {
    [P in keyof T & keyof AggregatePollOption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePollOption[P]> : Prisma.GetScalarType<T[P], AggregatePollOption[P]>;
};
export type PollOptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollOptionWhereInput;
    orderBy?: Prisma.PollOptionOrderByWithAggregationInput | Prisma.PollOptionOrderByWithAggregationInput[];
    by: Prisma.PollOptionScalarFieldEnum[] | Prisma.PollOptionScalarFieldEnum;
    having?: Prisma.PollOptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PollOptionCountAggregateInputType | true;
    _avg?: PollOptionAvgAggregateInputType;
    _sum?: PollOptionSumAggregateInputType;
    _min?: PollOptionMinAggregateInputType;
    _max?: PollOptionMaxAggregateInputType;
};
export type PollOptionGroupByOutputType = {
    id: number;
    pollId: number;
    text: string;
    order: number;
    createdAt: Date;
    _count: PollOptionCountAggregateOutputType | null;
    _avg: PollOptionAvgAggregateOutputType | null;
    _sum: PollOptionSumAggregateOutputType | null;
    _min: PollOptionMinAggregateOutputType | null;
    _max: PollOptionMaxAggregateOutputType | null;
};
type GetPollOptionGroupByPayload<T extends PollOptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PollOptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PollOptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PollOptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PollOptionGroupByOutputType[P]>;
}>>;
export type PollOptionWhereInput = {
    AND?: Prisma.PollOptionWhereInput | Prisma.PollOptionWhereInput[];
    OR?: Prisma.PollOptionWhereInput[];
    NOT?: Prisma.PollOptionWhereInput | Prisma.PollOptionWhereInput[];
    id?: Prisma.IntFilter<"PollOption"> | number;
    pollId?: Prisma.IntFilter<"PollOption"> | number;
    text?: Prisma.StringFilter<"PollOption"> | string;
    order?: Prisma.IntFilter<"PollOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollOption"> | Date | string;
    poll?: Prisma.XOR<Prisma.PollScalarRelationFilter, Prisma.PollWhereInput>;
    votes?: Prisma.PollVoteListRelationFilter;
};
export type PollOptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    poll?: Prisma.PollOrderByWithRelationInput;
    votes?: Prisma.PollVoteOrderByRelationAggregateInput;
};
export type PollOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PollOptionWhereInput | Prisma.PollOptionWhereInput[];
    OR?: Prisma.PollOptionWhereInput[];
    NOT?: Prisma.PollOptionWhereInput | Prisma.PollOptionWhereInput[];
    pollId?: Prisma.IntFilter<"PollOption"> | number;
    text?: Prisma.StringFilter<"PollOption"> | string;
    order?: Prisma.IntFilter<"PollOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollOption"> | Date | string;
    poll?: Prisma.XOR<Prisma.PollScalarRelationFilter, Prisma.PollWhereInput>;
    votes?: Prisma.PollVoteListRelationFilter;
}, "id">;
export type PollOptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PollOptionCountOrderByAggregateInput;
    _avg?: Prisma.PollOptionAvgOrderByAggregateInput;
    _max?: Prisma.PollOptionMaxOrderByAggregateInput;
    _min?: Prisma.PollOptionMinOrderByAggregateInput;
    _sum?: Prisma.PollOptionSumOrderByAggregateInput;
};
export type PollOptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PollOptionScalarWhereWithAggregatesInput | Prisma.PollOptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PollOptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PollOptionScalarWhereWithAggregatesInput | Prisma.PollOptionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PollOption"> | number;
    pollId?: Prisma.IntWithAggregatesFilter<"PollOption"> | number;
    text?: Prisma.StringWithAggregatesFilter<"PollOption"> | string;
    order?: Prisma.IntWithAggregatesFilter<"PollOption"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PollOption"> | Date | string;
};
export type PollOptionCreateInput = {
    text: string;
    order?: number;
    createdAt?: Date | string;
    poll: Prisma.PollCreateNestedOneWithoutOptionsInput;
    votes?: Prisma.PollVoteCreateNestedManyWithoutOptionInput;
};
export type PollOptionUncheckedCreateInput = {
    id?: number;
    pollId: number;
    text: string;
    order?: number;
    createdAt?: Date | string;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutOptionInput;
};
export type PollOptionUpdateInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poll?: Prisma.PollUpdateOneRequiredWithoutOptionsNestedInput;
    votes?: Prisma.PollVoteUpdateManyWithoutOptionNestedInput;
};
export type PollOptionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutOptionNestedInput;
};
export type PollOptionCreateManyInput = {
    id?: number;
    pollId: number;
    text: string;
    order?: number;
    createdAt?: Date | string;
};
export type PollOptionUpdateManyMutationInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollOptionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollOptionListRelationFilter = {
    every?: Prisma.PollOptionWhereInput;
    some?: Prisma.PollOptionWhereInput;
    none?: Prisma.PollOptionWhereInput;
};
export type PollOptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PollOptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollOptionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type PollOptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollOptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PollOptionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pollId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type PollOptionScalarRelationFilter = {
    is?: Prisma.PollOptionWhereInput;
    isNot?: Prisma.PollOptionWhereInput;
};
export type PollOptionCreateNestedManyWithoutPollInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput> | Prisma.PollOptionCreateWithoutPollInput[] | Prisma.PollOptionUncheckedCreateWithoutPollInput[];
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutPollInput | Prisma.PollOptionCreateOrConnectWithoutPollInput[];
    createMany?: Prisma.PollOptionCreateManyPollInputEnvelope;
    connect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
};
export type PollOptionUncheckedCreateNestedManyWithoutPollInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput> | Prisma.PollOptionCreateWithoutPollInput[] | Prisma.PollOptionUncheckedCreateWithoutPollInput[];
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutPollInput | Prisma.PollOptionCreateOrConnectWithoutPollInput[];
    createMany?: Prisma.PollOptionCreateManyPollInputEnvelope;
    connect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
};
export type PollOptionUpdateManyWithoutPollNestedInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput> | Prisma.PollOptionCreateWithoutPollInput[] | Prisma.PollOptionUncheckedCreateWithoutPollInput[];
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutPollInput | Prisma.PollOptionCreateOrConnectWithoutPollInput[];
    upsert?: Prisma.PollOptionUpsertWithWhereUniqueWithoutPollInput | Prisma.PollOptionUpsertWithWhereUniqueWithoutPollInput[];
    createMany?: Prisma.PollOptionCreateManyPollInputEnvelope;
    set?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    disconnect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    delete?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    connect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    update?: Prisma.PollOptionUpdateWithWhereUniqueWithoutPollInput | Prisma.PollOptionUpdateWithWhereUniqueWithoutPollInput[];
    updateMany?: Prisma.PollOptionUpdateManyWithWhereWithoutPollInput | Prisma.PollOptionUpdateManyWithWhereWithoutPollInput[];
    deleteMany?: Prisma.PollOptionScalarWhereInput | Prisma.PollOptionScalarWhereInput[];
};
export type PollOptionUncheckedUpdateManyWithoutPollNestedInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput> | Prisma.PollOptionCreateWithoutPollInput[] | Prisma.PollOptionUncheckedCreateWithoutPollInput[];
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutPollInput | Prisma.PollOptionCreateOrConnectWithoutPollInput[];
    upsert?: Prisma.PollOptionUpsertWithWhereUniqueWithoutPollInput | Prisma.PollOptionUpsertWithWhereUniqueWithoutPollInput[];
    createMany?: Prisma.PollOptionCreateManyPollInputEnvelope;
    set?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    disconnect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    delete?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    connect?: Prisma.PollOptionWhereUniqueInput | Prisma.PollOptionWhereUniqueInput[];
    update?: Prisma.PollOptionUpdateWithWhereUniqueWithoutPollInput | Prisma.PollOptionUpdateWithWhereUniqueWithoutPollInput[];
    updateMany?: Prisma.PollOptionUpdateManyWithWhereWithoutPollInput | Prisma.PollOptionUpdateManyWithWhereWithoutPollInput[];
    deleteMany?: Prisma.PollOptionScalarWhereInput | Prisma.PollOptionScalarWhereInput[];
};
export type PollOptionCreateNestedOneWithoutVotesInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutVotesInput, Prisma.PollOptionUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutVotesInput;
    connect?: Prisma.PollOptionWhereUniqueInput;
};
export type PollOptionUpdateOneRequiredWithoutVotesNestedInput = {
    create?: Prisma.XOR<Prisma.PollOptionCreateWithoutVotesInput, Prisma.PollOptionUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.PollOptionCreateOrConnectWithoutVotesInput;
    upsert?: Prisma.PollOptionUpsertWithoutVotesInput;
    connect?: Prisma.PollOptionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PollOptionUpdateToOneWithWhereWithoutVotesInput, Prisma.PollOptionUpdateWithoutVotesInput>, Prisma.PollOptionUncheckedUpdateWithoutVotesInput>;
};
export type PollOptionCreateWithoutPollInput = {
    text: string;
    order?: number;
    createdAt?: Date | string;
    votes?: Prisma.PollVoteCreateNestedManyWithoutOptionInput;
};
export type PollOptionUncheckedCreateWithoutPollInput = {
    id?: number;
    text: string;
    order?: number;
    createdAt?: Date | string;
    votes?: Prisma.PollVoteUncheckedCreateNestedManyWithoutOptionInput;
};
export type PollOptionCreateOrConnectWithoutPollInput = {
    where: Prisma.PollOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput>;
};
export type PollOptionCreateManyPollInputEnvelope = {
    data: Prisma.PollOptionCreateManyPollInput | Prisma.PollOptionCreateManyPollInput[];
    skipDuplicates?: boolean;
};
export type PollOptionUpsertWithWhereUniqueWithoutPollInput = {
    where: Prisma.PollOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PollOptionUpdateWithoutPollInput, Prisma.PollOptionUncheckedUpdateWithoutPollInput>;
    create: Prisma.XOR<Prisma.PollOptionCreateWithoutPollInput, Prisma.PollOptionUncheckedCreateWithoutPollInput>;
};
export type PollOptionUpdateWithWhereUniqueWithoutPollInput = {
    where: Prisma.PollOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PollOptionUpdateWithoutPollInput, Prisma.PollOptionUncheckedUpdateWithoutPollInput>;
};
export type PollOptionUpdateManyWithWhereWithoutPollInput = {
    where: Prisma.PollOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.PollOptionUpdateManyMutationInput, Prisma.PollOptionUncheckedUpdateManyWithoutPollInput>;
};
export type PollOptionScalarWhereInput = {
    AND?: Prisma.PollOptionScalarWhereInput | Prisma.PollOptionScalarWhereInput[];
    OR?: Prisma.PollOptionScalarWhereInput[];
    NOT?: Prisma.PollOptionScalarWhereInput | Prisma.PollOptionScalarWhereInput[];
    id?: Prisma.IntFilter<"PollOption"> | number;
    pollId?: Prisma.IntFilter<"PollOption"> | number;
    text?: Prisma.StringFilter<"PollOption"> | string;
    order?: Prisma.IntFilter<"PollOption"> | number;
    createdAt?: Prisma.DateTimeFilter<"PollOption"> | Date | string;
};
export type PollOptionCreateWithoutVotesInput = {
    text: string;
    order?: number;
    createdAt?: Date | string;
    poll: Prisma.PollCreateNestedOneWithoutOptionsInput;
};
export type PollOptionUncheckedCreateWithoutVotesInput = {
    id?: number;
    pollId: number;
    text: string;
    order?: number;
    createdAt?: Date | string;
};
export type PollOptionCreateOrConnectWithoutVotesInput = {
    where: Prisma.PollOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollOptionCreateWithoutVotesInput, Prisma.PollOptionUncheckedCreateWithoutVotesInput>;
};
export type PollOptionUpsertWithoutVotesInput = {
    update: Prisma.XOR<Prisma.PollOptionUpdateWithoutVotesInput, Prisma.PollOptionUncheckedUpdateWithoutVotesInput>;
    create: Prisma.XOR<Prisma.PollOptionCreateWithoutVotesInput, Prisma.PollOptionUncheckedCreateWithoutVotesInput>;
    where?: Prisma.PollOptionWhereInput;
};
export type PollOptionUpdateToOneWithWhereWithoutVotesInput = {
    where?: Prisma.PollOptionWhereInput;
    data: Prisma.XOR<Prisma.PollOptionUpdateWithoutVotesInput, Prisma.PollOptionUncheckedUpdateWithoutVotesInput>;
};
export type PollOptionUpdateWithoutVotesInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    poll?: Prisma.PollUpdateOneRequiredWithoutOptionsNestedInput;
};
export type PollOptionUncheckedUpdateWithoutVotesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    pollId?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollOptionCreateManyPollInput = {
    id?: number;
    text: string;
    order?: number;
    createdAt?: Date | string;
};
export type PollOptionUpdateWithoutPollInput = {
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.PollVoteUpdateManyWithoutOptionNestedInput;
};
export type PollOptionUncheckedUpdateWithoutPollInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.PollVoteUncheckedUpdateManyWithoutOptionNestedInput;
};
export type PollOptionUncheckedUpdateManyWithoutPollInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PollOptionCountOutputType = {
    votes: number;
};
export type PollOptionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    votes?: boolean | PollOptionCountOutputTypeCountVotesArgs;
};
export type PollOptionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionCountOutputTypeSelect<ExtArgs> | null;
};
export type PollOptionCountOutputTypeCountVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollVoteWhereInput;
};
export type PollOptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    text?: boolean;
    order?: boolean;
    createdAt?: boolean;
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.PollOption$votesArgs<ExtArgs>;
    _count?: boolean | Prisma.PollOptionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollOption"]>;
export type PollOptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    text?: boolean;
    order?: boolean;
    createdAt?: boolean;
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollOption"]>;
export type PollOptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pollId?: boolean;
    text?: boolean;
    order?: boolean;
    createdAt?: boolean;
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pollOption"]>;
export type PollOptionSelectScalar = {
    id?: boolean;
    pollId?: boolean;
    text?: boolean;
    order?: boolean;
    createdAt?: boolean;
};
export type PollOptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pollId" | "text" | "order" | "createdAt", ExtArgs["result"]["pollOption"]>;
export type PollOptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.PollOption$votesArgs<ExtArgs>;
    _count?: boolean | Prisma.PollOptionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PollOptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
};
export type PollOptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    poll?: boolean | Prisma.PollDefaultArgs<ExtArgs>;
};
export type $PollOptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PollOption";
    objects: {
        poll: Prisma.$PollPayload<ExtArgs>;
        votes: Prisma.$PollVotePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        pollId: number;
        text: string;
        order: number;
        createdAt: Date;
    }, ExtArgs["result"]["pollOption"]>;
    composites: {};
};
export type PollOptionGetPayload<S extends boolean | null | undefined | PollOptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PollOptionPayload, S>;
export type PollOptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PollOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PollOptionCountAggregateInputType | true;
};
export interface PollOptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PollOption'];
        meta: {
            name: 'PollOption';
        };
    };
    findUnique<T extends PollOptionFindUniqueArgs>(args: Prisma.SelectSubset<T, PollOptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PollOptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PollOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PollOptionFindFirstArgs>(args?: Prisma.SelectSubset<T, PollOptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PollOptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PollOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PollOptionFindManyArgs>(args?: Prisma.SelectSubset<T, PollOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PollOptionCreateArgs>(args: Prisma.SelectSubset<T, PollOptionCreateArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PollOptionCreateManyArgs>(args?: Prisma.SelectSubset<T, PollOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PollOptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PollOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PollOptionDeleteArgs>(args: Prisma.SelectSubset<T, PollOptionDeleteArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PollOptionUpdateArgs>(args: Prisma.SelectSubset<T, PollOptionUpdateArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PollOptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PollOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PollOptionUpdateManyArgs>(args: Prisma.SelectSubset<T, PollOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PollOptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PollOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PollOptionUpsertArgs>(args: Prisma.SelectSubset<T, PollOptionUpsertArgs<ExtArgs>>): Prisma.Prisma__PollOptionClient<runtime.Types.Result.GetResult<Prisma.$PollOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PollOptionCountArgs>(args?: Prisma.Subset<T, PollOptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PollOptionCountAggregateOutputType> : number>;
    aggregate<T extends PollOptionAggregateArgs>(args: Prisma.Subset<T, PollOptionAggregateArgs>): Prisma.PrismaPromise<GetPollOptionAggregateType<T>>;
    groupBy<T extends PollOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PollOptionGroupByArgs['orderBy'];
    } : {
        orderBy?: PollOptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PollOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPollOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PollOptionFieldRefs;
}
export interface Prisma__PollOptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    poll<T extends Prisma.PollDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PollDefaultArgs<ExtArgs>>): Prisma.Prisma__PollClient<runtime.Types.Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    votes<T extends Prisma.PollOption$votesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PollOption$votesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PollVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PollOptionFieldRefs {
    readonly id: Prisma.FieldRef<"PollOption", 'Int'>;
    readonly pollId: Prisma.FieldRef<"PollOption", 'Int'>;
    readonly text: Prisma.FieldRef<"PollOption", 'String'>;
    readonly order: Prisma.FieldRef<"PollOption", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"PollOption", 'DateTime'>;
}
export type PollOptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where: Prisma.PollOptionWhereUniqueInput;
};
export type PollOptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where: Prisma.PollOptionWhereUniqueInput;
};
export type PollOptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PollOptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PollOptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PollOptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollOptionCreateInput, Prisma.PollOptionUncheckedCreateInput>;
};
export type PollOptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PollOptionCreateManyInput | Prisma.PollOptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PollOptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    data: Prisma.PollOptionCreateManyInput | Prisma.PollOptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PollOptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PollOptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollOptionUpdateInput, Prisma.PollOptionUncheckedUpdateInput>;
    where: Prisma.PollOptionWhereUniqueInput;
};
export type PollOptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PollOptionUpdateManyMutationInput, Prisma.PollOptionUncheckedUpdateManyInput>;
    where?: Prisma.PollOptionWhereInput;
    limit?: number;
};
export type PollOptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PollOptionUpdateManyMutationInput, Prisma.PollOptionUncheckedUpdateManyInput>;
    where?: Prisma.PollOptionWhereInput;
    limit?: number;
    include?: Prisma.PollOptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PollOptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where: Prisma.PollOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PollOptionCreateInput, Prisma.PollOptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PollOptionUpdateInput, Prisma.PollOptionUncheckedUpdateInput>;
};
export type PollOptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
    where: Prisma.PollOptionWhereUniqueInput;
};
export type PollOptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PollOptionWhereInput;
    limit?: number;
};
export type PollOption$votesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PollOptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PollOptionSelect<ExtArgs> | null;
    omit?: Prisma.PollOptionOmit<ExtArgs> | null;
    include?: Prisma.PollOptionInclude<ExtArgs> | null;
};
export {};
