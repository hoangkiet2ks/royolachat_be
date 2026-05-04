import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type GroupJoinRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$GroupJoinRequestPayload>;
export type AggregateGroupJoinRequest = {
    _count: GroupJoinRequestCountAggregateOutputType | null;
    _avg: GroupJoinRequestAvgAggregateOutputType | null;
    _sum: GroupJoinRequestSumAggregateOutputType | null;
    _min: GroupJoinRequestMinAggregateOutputType | null;
    _max: GroupJoinRequestMaxAggregateOutputType | null;
};
export type GroupJoinRequestAvgAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    userId: number | null;
    inviterId: number | null;
};
export type GroupJoinRequestSumAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    userId: number | null;
    inviterId: number | null;
};
export type GroupJoinRequestMinAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    userId: number | null;
    inviterId: number | null;
    status: string | null;
    createdAt: Date | null;
};
export type GroupJoinRequestMaxAggregateOutputType = {
    id: number | null;
    conversationId: number | null;
    userId: number | null;
    inviterId: number | null;
    status: string | null;
    createdAt: Date | null;
};
export type GroupJoinRequestCountAggregateOutputType = {
    id: number;
    conversationId: number;
    userId: number;
    inviterId: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type GroupJoinRequestAvgAggregateInputType = {
    id?: true;
    conversationId?: true;
    userId?: true;
    inviterId?: true;
};
export type GroupJoinRequestSumAggregateInputType = {
    id?: true;
    conversationId?: true;
    userId?: true;
    inviterId?: true;
};
export type GroupJoinRequestMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    userId?: true;
    inviterId?: true;
    status?: true;
    createdAt?: true;
};
export type GroupJoinRequestMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    userId?: true;
    inviterId?: true;
    status?: true;
    createdAt?: true;
};
export type GroupJoinRequestCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    userId?: true;
    inviterId?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type GroupJoinRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupJoinRequestWhereInput;
    orderBy?: Prisma.GroupJoinRequestOrderByWithRelationInput | Prisma.GroupJoinRequestOrderByWithRelationInput[];
    cursor?: Prisma.GroupJoinRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GroupJoinRequestCountAggregateInputType;
    _avg?: GroupJoinRequestAvgAggregateInputType;
    _sum?: GroupJoinRequestSumAggregateInputType;
    _min?: GroupJoinRequestMinAggregateInputType;
    _max?: GroupJoinRequestMaxAggregateInputType;
};
export type GetGroupJoinRequestAggregateType<T extends GroupJoinRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateGroupJoinRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGroupJoinRequest[P]> : Prisma.GetScalarType<T[P], AggregateGroupJoinRequest[P]>;
};
export type GroupJoinRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupJoinRequestWhereInput;
    orderBy?: Prisma.GroupJoinRequestOrderByWithAggregationInput | Prisma.GroupJoinRequestOrderByWithAggregationInput[];
    by: Prisma.GroupJoinRequestScalarFieldEnum[] | Prisma.GroupJoinRequestScalarFieldEnum;
    having?: Prisma.GroupJoinRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GroupJoinRequestCountAggregateInputType | true;
    _avg?: GroupJoinRequestAvgAggregateInputType;
    _sum?: GroupJoinRequestSumAggregateInputType;
    _min?: GroupJoinRequestMinAggregateInputType;
    _max?: GroupJoinRequestMaxAggregateInputType;
};
export type GroupJoinRequestGroupByOutputType = {
    id: number;
    conversationId: number;
    userId: number;
    inviterId: number;
    status: string;
    createdAt: Date;
    _count: GroupJoinRequestCountAggregateOutputType | null;
    _avg: GroupJoinRequestAvgAggregateOutputType | null;
    _sum: GroupJoinRequestSumAggregateOutputType | null;
    _min: GroupJoinRequestMinAggregateOutputType | null;
    _max: GroupJoinRequestMaxAggregateOutputType | null;
};
type GetGroupJoinRequestGroupByPayload<T extends GroupJoinRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GroupJoinRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GroupJoinRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GroupJoinRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GroupJoinRequestGroupByOutputType[P]>;
}>>;
export type GroupJoinRequestWhereInput = {
    AND?: Prisma.GroupJoinRequestWhereInput | Prisma.GroupJoinRequestWhereInput[];
    OR?: Prisma.GroupJoinRequestWhereInput[];
    NOT?: Prisma.GroupJoinRequestWhereInput | Prisma.GroupJoinRequestWhereInput[];
    id?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    conversationId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    userId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    inviterId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    status?: Prisma.StringFilter<"GroupJoinRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"GroupJoinRequest"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inviter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type GroupJoinRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    inviter?: Prisma.UserOrderByWithRelationInput;
};
export type GroupJoinRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    conversationId_userId?: Prisma.GroupJoinRequestConversationIdUserIdCompoundUniqueInput;
    AND?: Prisma.GroupJoinRequestWhereInput | Prisma.GroupJoinRequestWhereInput[];
    OR?: Prisma.GroupJoinRequestWhereInput[];
    NOT?: Prisma.GroupJoinRequestWhereInput | Prisma.GroupJoinRequestWhereInput[];
    conversationId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    userId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    inviterId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    status?: Prisma.StringFilter<"GroupJoinRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"GroupJoinRequest"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    inviter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "conversationId_userId">;
export type GroupJoinRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.GroupJoinRequestCountOrderByAggregateInput;
    _avg?: Prisma.GroupJoinRequestAvgOrderByAggregateInput;
    _max?: Prisma.GroupJoinRequestMaxOrderByAggregateInput;
    _min?: Prisma.GroupJoinRequestMinOrderByAggregateInput;
    _sum?: Prisma.GroupJoinRequestSumOrderByAggregateInput;
};
export type GroupJoinRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.GroupJoinRequestScalarWhereWithAggregatesInput | Prisma.GroupJoinRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.GroupJoinRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GroupJoinRequestScalarWhereWithAggregatesInput | Prisma.GroupJoinRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"GroupJoinRequest"> | number;
    conversationId?: Prisma.IntWithAggregatesFilter<"GroupJoinRequest"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"GroupJoinRequest"> | number;
    inviterId?: Prisma.IntWithAggregatesFilter<"GroupJoinRequest"> | number;
    status?: Prisma.StringWithAggregatesFilter<"GroupJoinRequest"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"GroupJoinRequest"> | Date | string;
};
export type GroupJoinRequestCreateInput = {
    status?: string;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutJoinRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutRoupJoinRequestsReceivedInput;
    inviter: Prisma.UserCreateNestedOneWithoutGroupJoinRequestsSentInput;
};
export type GroupJoinRequestUncheckedCreateInput = {
    id?: number;
    conversationId: number;
    userId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestUpdateInput = {
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutJoinRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRoupJoinRequestsReceivedNestedInput;
    inviter?: Prisma.UserUpdateOneRequiredWithoutGroupJoinRequestsSentNestedInput;
};
export type GroupJoinRequestUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestCreateManyInput = {
    id?: number;
    conversationId: number;
    userId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestUpdateManyMutationInput = {
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestListRelationFilter = {
    every?: Prisma.GroupJoinRequestWhereInput;
    some?: Prisma.GroupJoinRequestWhereInput;
    none?: Prisma.GroupJoinRequestWhereInput;
};
export type GroupJoinRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GroupJoinRequestConversationIdUserIdCompoundUniqueInput = {
    conversationId: number;
    userId: number;
};
export type GroupJoinRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupJoinRequestAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
};
export type GroupJoinRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupJoinRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupJoinRequestSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    inviterId?: Prisma.SortOrder;
};
export type GroupJoinRequestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput> | Prisma.GroupJoinRequestCreateWithoutUserInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput | Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyUserInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestCreateNestedManyWithoutInviterInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput> | Prisma.GroupJoinRequestCreateWithoutInviterInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput | Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyInviterInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput> | Prisma.GroupJoinRequestCreateWithoutUserInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput | Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyUserInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestUncheckedCreateNestedManyWithoutInviterInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput> | Prisma.GroupJoinRequestCreateWithoutInviterInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput | Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyInviterInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput> | Prisma.GroupJoinRequestCreateWithoutUserInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput | Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyUserInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutUserInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestUpdateManyWithoutInviterNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput> | Prisma.GroupJoinRequestCreateWithoutInviterInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput | Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutInviterInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutInviterInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyInviterInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutInviterInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutInviterInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutInviterInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutInviterInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput> | Prisma.GroupJoinRequestCreateWithoutUserInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput | Prisma.GroupJoinRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyUserInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutUserInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput> | Prisma.GroupJoinRequestCreateWithoutInviterInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput | Prisma.GroupJoinRequestCreateOrConnectWithoutInviterInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutInviterInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutInviterInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyInviterInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutInviterInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutInviterInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutInviterInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutInviterInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput> | Prisma.GroupJoinRequestCreateWithoutConversationInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput | Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyConversationInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput> | Prisma.GroupJoinRequestCreateWithoutConversationInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput | Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyConversationInputEnvelope;
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
};
export type GroupJoinRequestUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput> | Prisma.GroupJoinRequestCreateWithoutConversationInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput | Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutConversationInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyConversationInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutConversationInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutConversationInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput> | Prisma.GroupJoinRequestCreateWithoutConversationInput[] | Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput | Prisma.GroupJoinRequestCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutConversationInput | Prisma.GroupJoinRequestUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.GroupJoinRequestCreateManyConversationInputEnvelope;
    set?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    disconnect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    delete?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    connect?: Prisma.GroupJoinRequestWhereUniqueInput | Prisma.GroupJoinRequestWhereUniqueInput[];
    update?: Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutConversationInput | Prisma.GroupJoinRequestUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.GroupJoinRequestUpdateManyWithWhereWithoutConversationInput | Prisma.GroupJoinRequestUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
};
export type GroupJoinRequestCreateWithoutUserInput = {
    status?: string;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutJoinRequestsInput;
    inviter: Prisma.UserCreateNestedOneWithoutGroupJoinRequestsSentInput;
};
export type GroupJoinRequestUncheckedCreateWithoutUserInput = {
    id?: number;
    conversationId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput>;
};
export type GroupJoinRequestCreateManyUserInputEnvelope = {
    data: Prisma.GroupJoinRequestCreateManyUserInput | Prisma.GroupJoinRequestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type GroupJoinRequestCreateWithoutInviterInput = {
    status?: string;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutJoinRequestsInput;
    user: Prisma.UserCreateNestedOneWithoutRoupJoinRequestsReceivedInput;
};
export type GroupJoinRequestUncheckedCreateWithoutInviterInput = {
    id?: number;
    conversationId: number;
    userId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestCreateOrConnectWithoutInviterInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput>;
};
export type GroupJoinRequestCreateManyInviterInputEnvelope = {
    data: Prisma.GroupJoinRequestCreateManyInviterInput | Prisma.GroupJoinRequestCreateManyInviterInput[];
    skipDuplicates?: boolean;
};
export type GroupJoinRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutUserInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutUserInput, Prisma.GroupJoinRequestUncheckedCreateWithoutUserInput>;
};
export type GroupJoinRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutUserInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutUserInput>;
};
export type GroupJoinRequestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.GroupJoinRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateManyMutationInput, Prisma.GroupJoinRequestUncheckedUpdateManyWithoutUserInput>;
};
export type GroupJoinRequestScalarWhereInput = {
    AND?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
    OR?: Prisma.GroupJoinRequestScalarWhereInput[];
    NOT?: Prisma.GroupJoinRequestScalarWhereInput | Prisma.GroupJoinRequestScalarWhereInput[];
    id?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    conversationId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    userId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    inviterId?: Prisma.IntFilter<"GroupJoinRequest"> | number;
    status?: Prisma.StringFilter<"GroupJoinRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"GroupJoinRequest"> | Date | string;
};
export type GroupJoinRequestUpsertWithWhereUniqueWithoutInviterInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutInviterInput>;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedCreateWithoutInviterInput>;
};
export type GroupJoinRequestUpdateWithWhereUniqueWithoutInviterInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutInviterInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutInviterInput>;
};
export type GroupJoinRequestUpdateManyWithWhereWithoutInviterInput = {
    where: Prisma.GroupJoinRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateManyMutationInput, Prisma.GroupJoinRequestUncheckedUpdateManyWithoutInviterInput>;
};
export type GroupJoinRequestCreateWithoutConversationInput = {
    status?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRoupJoinRequestsReceivedInput;
    inviter: Prisma.UserCreateNestedOneWithoutGroupJoinRequestsSentInput;
};
export type GroupJoinRequestUncheckedCreateWithoutConversationInput = {
    id?: number;
    userId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestCreateOrConnectWithoutConversationInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput>;
};
export type GroupJoinRequestCreateManyConversationInputEnvelope = {
    data: Prisma.GroupJoinRequestCreateManyConversationInput | Prisma.GroupJoinRequestCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type GroupJoinRequestUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedCreateWithoutConversationInput>;
};
export type GroupJoinRequestUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateWithoutConversationInput, Prisma.GroupJoinRequestUncheckedUpdateWithoutConversationInput>;
};
export type GroupJoinRequestUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.GroupJoinRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateManyMutationInput, Prisma.GroupJoinRequestUncheckedUpdateManyWithoutConversationInput>;
};
export type GroupJoinRequestCreateManyUserInput = {
    id?: number;
    conversationId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestCreateManyInviterInput = {
    id?: number;
    conversationId: number;
    userId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestUpdateWithoutUserInput = {
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutJoinRequestsNestedInput;
    inviter?: Prisma.UserUpdateOneRequiredWithoutGroupJoinRequestsSentNestedInput;
};
export type GroupJoinRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestUpdateWithoutInviterInput = {
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutJoinRequestsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRoupJoinRequestsReceivedNestedInput;
};
export type GroupJoinRequestUncheckedUpdateWithoutInviterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestUncheckedUpdateManyWithoutInviterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestCreateManyConversationInput = {
    id?: number;
    userId: number;
    inviterId: number;
    status?: string;
    createdAt?: Date | string;
};
export type GroupJoinRequestUpdateWithoutConversationInput = {
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRoupJoinRequestsReceivedNestedInput;
    inviter?: Prisma.UserUpdateOneRequiredWithoutGroupJoinRequestsSentNestedInput;
};
export type GroupJoinRequestUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    inviterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupJoinRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    userId?: boolean;
    inviterId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groupJoinRequest"]>;
export type GroupJoinRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    userId?: boolean;
    inviterId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groupJoinRequest"]>;
export type GroupJoinRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    userId?: boolean;
    inviterId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["groupJoinRequest"]>;
export type GroupJoinRequestSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    userId?: boolean;
    inviterId?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type GroupJoinRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "conversationId" | "userId" | "inviterId" | "status" | "createdAt", ExtArgs["result"]["groupJoinRequest"]>;
export type GroupJoinRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type GroupJoinRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type GroupJoinRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    inviter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $GroupJoinRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GroupJoinRequest";
    objects: {
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        inviter: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        conversationId: number;
        userId: number;
        inviterId: number;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["groupJoinRequest"]>;
    composites: {};
};
export type GroupJoinRequestGetPayload<S extends boolean | null | undefined | GroupJoinRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload, S>;
export type GroupJoinRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GroupJoinRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GroupJoinRequestCountAggregateInputType | true;
};
export interface GroupJoinRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GroupJoinRequest'];
        meta: {
            name: 'GroupJoinRequest';
        };
    };
    findUnique<T extends GroupJoinRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GroupJoinRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GroupJoinRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GroupJoinRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GroupJoinRequestFindManyArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GroupJoinRequestCreateArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestCreateArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GroupJoinRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GroupJoinRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GroupJoinRequestDeleteArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GroupJoinRequestUpdateArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GroupJoinRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, GroupJoinRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GroupJoinRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GroupJoinRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GroupJoinRequestUpsertArgs>(args: Prisma.SelectSubset<T, GroupJoinRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__GroupJoinRequestClient<runtime.Types.Result.GetResult<Prisma.$GroupJoinRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GroupJoinRequestCountArgs>(args?: Prisma.Subset<T, GroupJoinRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GroupJoinRequestCountAggregateOutputType> : number>;
    aggregate<T extends GroupJoinRequestAggregateArgs>(args: Prisma.Subset<T, GroupJoinRequestAggregateArgs>): Prisma.PrismaPromise<GetGroupJoinRequestAggregateType<T>>;
    groupBy<T extends GroupJoinRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GroupJoinRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: GroupJoinRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GroupJoinRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupJoinRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GroupJoinRequestFieldRefs;
}
export interface Prisma__GroupJoinRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    inviter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GroupJoinRequestFieldRefs {
    readonly id: Prisma.FieldRef<"GroupJoinRequest", 'Int'>;
    readonly conversationId: Prisma.FieldRef<"GroupJoinRequest", 'Int'>;
    readonly userId: Prisma.FieldRef<"GroupJoinRequest", 'Int'>;
    readonly inviterId: Prisma.FieldRef<"GroupJoinRequest", 'Int'>;
    readonly status: Prisma.FieldRef<"GroupJoinRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"GroupJoinRequest", 'DateTime'>;
}
export type GroupJoinRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where: Prisma.GroupJoinRequestWhereUniqueInput;
};
export type GroupJoinRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where: Prisma.GroupJoinRequestWhereUniqueInput;
};
export type GroupJoinRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where?: Prisma.GroupJoinRequestWhereInput;
    orderBy?: Prisma.GroupJoinRequestOrderByWithRelationInput | Prisma.GroupJoinRequestOrderByWithRelationInput[];
    cursor?: Prisma.GroupJoinRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupJoinRequestScalarFieldEnum | Prisma.GroupJoinRequestScalarFieldEnum[];
};
export type GroupJoinRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where?: Prisma.GroupJoinRequestWhereInput;
    orderBy?: Prisma.GroupJoinRequestOrderByWithRelationInput | Prisma.GroupJoinRequestOrderByWithRelationInput[];
    cursor?: Prisma.GroupJoinRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupJoinRequestScalarFieldEnum | Prisma.GroupJoinRequestScalarFieldEnum[];
};
export type GroupJoinRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where?: Prisma.GroupJoinRequestWhereInput;
    orderBy?: Prisma.GroupJoinRequestOrderByWithRelationInput | Prisma.GroupJoinRequestOrderByWithRelationInput[];
    cursor?: Prisma.GroupJoinRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupJoinRequestScalarFieldEnum | Prisma.GroupJoinRequestScalarFieldEnum[];
};
export type GroupJoinRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GroupJoinRequestCreateInput, Prisma.GroupJoinRequestUncheckedCreateInput>;
};
export type GroupJoinRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GroupJoinRequestCreateManyInput | Prisma.GroupJoinRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GroupJoinRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    data: Prisma.GroupJoinRequestCreateManyInput | Prisma.GroupJoinRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GroupJoinRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GroupJoinRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateInput, Prisma.GroupJoinRequestUncheckedUpdateInput>;
    where: Prisma.GroupJoinRequestWhereUniqueInput;
};
export type GroupJoinRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateManyMutationInput, Prisma.GroupJoinRequestUncheckedUpdateManyInput>;
    where?: Prisma.GroupJoinRequestWhereInput;
    limit?: number;
};
export type GroupJoinRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GroupJoinRequestUpdateManyMutationInput, Prisma.GroupJoinRequestUncheckedUpdateManyInput>;
    where?: Prisma.GroupJoinRequestWhereInput;
    limit?: number;
    include?: Prisma.GroupJoinRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GroupJoinRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where: Prisma.GroupJoinRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupJoinRequestCreateInput, Prisma.GroupJoinRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GroupJoinRequestUpdateInput, Prisma.GroupJoinRequestUncheckedUpdateInput>;
};
export type GroupJoinRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
    where: Prisma.GroupJoinRequestWhereUniqueInput;
};
export type GroupJoinRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupJoinRequestWhereInput;
    limit?: number;
};
export type GroupJoinRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupJoinRequestSelect<ExtArgs> | null;
    omit?: Prisma.GroupJoinRequestOmit<ExtArgs> | null;
    include?: Prisma.GroupJoinRequestInclude<ExtArgs> | null;
};
export {};
