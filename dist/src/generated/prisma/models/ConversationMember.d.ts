import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ConversationMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationMemberPayload>;
export type AggregateConversationMember = {
    _count: ConversationMemberCountAggregateOutputType | null;
    _avg: ConversationMemberAvgAggregateOutputType | null;
    _sum: ConversationMemberSumAggregateOutputType | null;
    _min: ConversationMemberMinAggregateOutputType | null;
    _max: ConversationMemberMaxAggregateOutputType | null;
};
export type ConversationMemberAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    conversationId: number | null;
    lastReadMessageId: number | null;
};
export type ConversationMemberSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    conversationId: number | null;
    lastReadMessageId: number | null;
};
export type ConversationMemberMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    conversationId: number | null;
    role: $Enums.MemberRole | null;
    joinedAt: Date | null;
    lastReadMessageId: number | null;
    clearedAt: Date | null;
};
export type ConversationMemberMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    conversationId: number | null;
    role: $Enums.MemberRole | null;
    joinedAt: Date | null;
    lastReadMessageId: number | null;
    clearedAt: Date | null;
};
export type ConversationMemberCountAggregateOutputType = {
    id: number;
    userId: number;
    conversationId: number;
    role: number;
    joinedAt: number;
    lastReadMessageId: number;
    clearedAt: number;
    _all: number;
};
export type ConversationMemberAvgAggregateInputType = {
    id?: true;
    userId?: true;
    conversationId?: true;
    lastReadMessageId?: true;
};
export type ConversationMemberSumAggregateInputType = {
    id?: true;
    userId?: true;
    conversationId?: true;
    lastReadMessageId?: true;
};
export type ConversationMemberMinAggregateInputType = {
    id?: true;
    userId?: true;
    conversationId?: true;
    role?: true;
    joinedAt?: true;
    lastReadMessageId?: true;
    clearedAt?: true;
};
export type ConversationMemberMaxAggregateInputType = {
    id?: true;
    userId?: true;
    conversationId?: true;
    role?: true;
    joinedAt?: true;
    lastReadMessageId?: true;
    clearedAt?: true;
};
export type ConversationMemberCountAggregateInputType = {
    id?: true;
    userId?: true;
    conversationId?: true;
    role?: true;
    joinedAt?: true;
    lastReadMessageId?: true;
    clearedAt?: true;
    _all?: true;
};
export type ConversationMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationMemberWhereInput;
    orderBy?: Prisma.ConversationMemberOrderByWithRelationInput | Prisma.ConversationMemberOrderByWithRelationInput[];
    cursor?: Prisma.ConversationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationMemberCountAggregateInputType;
    _avg?: ConversationMemberAvgAggregateInputType;
    _sum?: ConversationMemberSumAggregateInputType;
    _min?: ConversationMemberMinAggregateInputType;
    _max?: ConversationMemberMaxAggregateInputType;
};
export type GetConversationMemberAggregateType<T extends ConversationMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateConversationMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversationMember[P]> : Prisma.GetScalarType<T[P], AggregateConversationMember[P]>;
};
export type ConversationMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationMemberWhereInput;
    orderBy?: Prisma.ConversationMemberOrderByWithAggregationInput | Prisma.ConversationMemberOrderByWithAggregationInput[];
    by: Prisma.ConversationMemberScalarFieldEnum[] | Prisma.ConversationMemberScalarFieldEnum;
    having?: Prisma.ConversationMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationMemberCountAggregateInputType | true;
    _avg?: ConversationMemberAvgAggregateInputType;
    _sum?: ConversationMemberSumAggregateInputType;
    _min?: ConversationMemberMinAggregateInputType;
    _max?: ConversationMemberMaxAggregateInputType;
};
export type ConversationMemberGroupByOutputType = {
    id: number;
    userId: number;
    conversationId: number;
    role: $Enums.MemberRole;
    joinedAt: Date;
    lastReadMessageId: number | null;
    clearedAt: Date | null;
    _count: ConversationMemberCountAggregateOutputType | null;
    _avg: ConversationMemberAvgAggregateOutputType | null;
    _sum: ConversationMemberSumAggregateOutputType | null;
    _min: ConversationMemberMinAggregateOutputType | null;
    _max: ConversationMemberMaxAggregateOutputType | null;
};
type GetConversationMemberGroupByPayload<T extends ConversationMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationMemberGroupByOutputType[P]>;
}>>;
export type ConversationMemberWhereInput = {
    AND?: Prisma.ConversationMemberWhereInput | Prisma.ConversationMemberWhereInput[];
    OR?: Prisma.ConversationMemberWhereInput[];
    NOT?: Prisma.ConversationMemberWhereInput | Prisma.ConversationMemberWhereInput[];
    id?: Prisma.IntFilter<"ConversationMember"> | number;
    userId?: Prisma.IntFilter<"ConversationMember"> | number;
    conversationId?: Prisma.IntFilter<"ConversationMember"> | number;
    role?: Prisma.EnumMemberRoleFilter<"ConversationMember"> | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFilter<"ConversationMember"> | Date | string;
    lastReadMessageId?: Prisma.IntNullableFilter<"ConversationMember"> | number | null;
    clearedAt?: Prisma.DateTimeNullableFilter<"ConversationMember"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    lastReadMessage?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.MessageWhereInput> | null;
};
export type ConversationMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    clearedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    lastReadMessage?: Prisma.MessageOrderByWithRelationInput;
};
export type ConversationMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId_conversationId?: Prisma.ConversationMemberUserIdConversationIdCompoundUniqueInput;
    AND?: Prisma.ConversationMemberWhereInput | Prisma.ConversationMemberWhereInput[];
    OR?: Prisma.ConversationMemberWhereInput[];
    NOT?: Prisma.ConversationMemberWhereInput | Prisma.ConversationMemberWhereInput[];
    userId?: Prisma.IntFilter<"ConversationMember"> | number;
    conversationId?: Prisma.IntFilter<"ConversationMember"> | number;
    role?: Prisma.EnumMemberRoleFilter<"ConversationMember"> | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFilter<"ConversationMember"> | Date | string;
    lastReadMessageId?: Prisma.IntNullableFilter<"ConversationMember"> | number | null;
    clearedAt?: Prisma.DateTimeNullableFilter<"ConversationMember"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    lastReadMessage?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.MessageWhereInput> | null;
}, "id" | "userId_conversationId">;
export type ConversationMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    clearedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ConversationMemberCountOrderByAggregateInput;
    _avg?: Prisma.ConversationMemberAvgOrderByAggregateInput;
    _max?: Prisma.ConversationMemberMaxOrderByAggregateInput;
    _min?: Prisma.ConversationMemberMinOrderByAggregateInput;
    _sum?: Prisma.ConversationMemberSumOrderByAggregateInput;
};
export type ConversationMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationMemberScalarWhereWithAggregatesInput | Prisma.ConversationMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationMemberScalarWhereWithAggregatesInput | Prisma.ConversationMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ConversationMember"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"ConversationMember"> | number;
    conversationId?: Prisma.IntWithAggregatesFilter<"ConversationMember"> | number;
    role?: Prisma.EnumMemberRoleWithAggregatesFilter<"ConversationMember"> | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"ConversationMember"> | Date | string;
    lastReadMessageId?: Prisma.IntNullableWithAggregatesFilter<"ConversationMember"> | number | null;
    clearedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ConversationMember"> | Date | string | null;
};
export type ConversationMemberCreateInput = {
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutConversationJoinedInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMembersInput;
    lastReadMessage?: Prisma.MessageCreateNestedOneWithoutReadByMembersInput;
};
export type ConversationMemberUncheckedCreateInput = {
    id?: number;
    userId: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberUpdateInput = {
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutConversationJoinedNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMembersNestedInput;
    lastReadMessage?: Prisma.MessageUpdateOneWithoutReadByMembersNestedInput;
};
export type ConversationMemberUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberCreateManyInput = {
    id?: number;
    userId: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberUpdateManyMutationInput = {
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberListRelationFilter = {
    every?: Prisma.ConversationMemberWhereInput;
    some?: Prisma.ConversationMemberWhereInput;
    none?: Prisma.ConversationMemberWhereInput;
};
export type ConversationMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationMemberUserIdConversationIdCompoundUniqueInput = {
    userId: number;
    conversationId: number;
};
export type ConversationMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrder;
    clearedAt?: Prisma.SortOrder;
};
export type ConversationMemberAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrder;
};
export type ConversationMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrder;
    clearedAt?: Prisma.SortOrder;
};
export type ConversationMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrder;
    clearedAt?: Prisma.SortOrder;
};
export type ConversationMemberSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    lastReadMessageId?: Prisma.SortOrder;
};
export type ConversationMemberCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput> | Prisma.ConversationMemberCreateWithoutUserInput[] | Prisma.ConversationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutUserInput | Prisma.ConversationMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ConversationMemberCreateManyUserInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput> | Prisma.ConversationMemberCreateWithoutUserInput[] | Prisma.ConversationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutUserInput | Prisma.ConversationMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ConversationMemberCreateManyUserInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput> | Prisma.ConversationMemberCreateWithoutUserInput[] | Prisma.ConversationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutUserInput | Prisma.ConversationMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ConversationMemberCreateManyUserInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutUserInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type ConversationMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput> | Prisma.ConversationMemberCreateWithoutUserInput[] | Prisma.ConversationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutUserInput | Prisma.ConversationMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ConversationMemberCreateManyUserInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutUserInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type ConversationMemberCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput> | Prisma.ConversationMemberCreateWithoutConversationInput[] | Prisma.ConversationMemberUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutConversationInput | Prisma.ConversationMemberCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ConversationMemberCreateManyConversationInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput> | Prisma.ConversationMemberCreateWithoutConversationInput[] | Prisma.ConversationMemberUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutConversationInput | Prisma.ConversationMemberCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ConversationMemberCreateManyConversationInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput> | Prisma.ConversationMemberCreateWithoutConversationInput[] | Prisma.ConversationMemberUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutConversationInput | Prisma.ConversationMemberCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutConversationInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ConversationMemberCreateManyConversationInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutConversationInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutConversationInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type ConversationMemberUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput> | Prisma.ConversationMemberCreateWithoutConversationInput[] | Prisma.ConversationMemberUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutConversationInput | Prisma.ConversationMemberCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutConversationInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ConversationMemberCreateManyConversationInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutConversationInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutConversationInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type EnumMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.MemberRole;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ConversationMemberCreateNestedManyWithoutLastReadMessageInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput> | Prisma.ConversationMemberCreateWithoutLastReadMessageInput[] | Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput | Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput[];
    createMany?: Prisma.ConversationMemberCreateManyLastReadMessageInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput> | Prisma.ConversationMemberCreateWithoutLastReadMessageInput[] | Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput | Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput[];
    createMany?: Prisma.ConversationMemberCreateManyLastReadMessageInputEnvelope;
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
};
export type ConversationMemberUpdateManyWithoutLastReadMessageNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput> | Prisma.ConversationMemberCreateWithoutLastReadMessageInput[] | Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput | Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutLastReadMessageInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutLastReadMessageInput[];
    createMany?: Prisma.ConversationMemberCreateManyLastReadMessageInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutLastReadMessageInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutLastReadMessageInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutLastReadMessageInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutLastReadMessageInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput> | Prisma.ConversationMemberCreateWithoutLastReadMessageInput[] | Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput[];
    connectOrCreate?: Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput | Prisma.ConversationMemberCreateOrConnectWithoutLastReadMessageInput[];
    upsert?: Prisma.ConversationMemberUpsertWithWhereUniqueWithoutLastReadMessageInput | Prisma.ConversationMemberUpsertWithWhereUniqueWithoutLastReadMessageInput[];
    createMany?: Prisma.ConversationMemberCreateManyLastReadMessageInputEnvelope;
    set?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    disconnect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    delete?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    connect?: Prisma.ConversationMemberWhereUniqueInput | Prisma.ConversationMemberWhereUniqueInput[];
    update?: Prisma.ConversationMemberUpdateWithWhereUniqueWithoutLastReadMessageInput | Prisma.ConversationMemberUpdateWithWhereUniqueWithoutLastReadMessageInput[];
    updateMany?: Prisma.ConversationMemberUpdateManyWithWhereWithoutLastReadMessageInput | Prisma.ConversationMemberUpdateManyWithWhereWithoutLastReadMessageInput[];
    deleteMany?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
};
export type ConversationMemberCreateWithoutUserInput = {
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
    conversation: Prisma.ConversationCreateNestedOneWithoutMembersInput;
    lastReadMessage?: Prisma.MessageCreateNestedOneWithoutReadByMembersInput;
};
export type ConversationMemberUncheckedCreateWithoutUserInput = {
    id?: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberCreateOrConnectWithoutUserInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput>;
};
export type ConversationMemberCreateManyUserInputEnvelope = {
    data: Prisma.ConversationMemberCreateManyUserInput | Prisma.ConversationMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ConversationMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutUserInput, Prisma.ConversationMemberUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutUserInput, Prisma.ConversationMemberUncheckedCreateWithoutUserInput>;
};
export type ConversationMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutUserInput, Prisma.ConversationMemberUncheckedUpdateWithoutUserInput>;
};
export type ConversationMemberUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ConversationMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateManyMutationInput, Prisma.ConversationMemberUncheckedUpdateManyWithoutUserInput>;
};
export type ConversationMemberScalarWhereInput = {
    AND?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
    OR?: Prisma.ConversationMemberScalarWhereInput[];
    NOT?: Prisma.ConversationMemberScalarWhereInput | Prisma.ConversationMemberScalarWhereInput[];
    id?: Prisma.IntFilter<"ConversationMember"> | number;
    userId?: Prisma.IntFilter<"ConversationMember"> | number;
    conversationId?: Prisma.IntFilter<"ConversationMember"> | number;
    role?: Prisma.EnumMemberRoleFilter<"ConversationMember"> | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFilter<"ConversationMember"> | Date | string;
    lastReadMessageId?: Prisma.IntNullableFilter<"ConversationMember"> | number | null;
    clearedAt?: Prisma.DateTimeNullableFilter<"ConversationMember"> | Date | string | null;
};
export type ConversationMemberCreateWithoutConversationInput = {
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutConversationJoinedInput;
    lastReadMessage?: Prisma.MessageCreateNestedOneWithoutReadByMembersInput;
};
export type ConversationMemberUncheckedCreateWithoutConversationInput = {
    id?: number;
    userId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberCreateOrConnectWithoutConversationInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput>;
};
export type ConversationMemberCreateManyConversationInputEnvelope = {
    data: Prisma.ConversationMemberCreateManyConversationInput | Prisma.ConversationMemberCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type ConversationMemberUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutConversationInput, Prisma.ConversationMemberUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutConversationInput, Prisma.ConversationMemberUncheckedCreateWithoutConversationInput>;
};
export type ConversationMemberUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutConversationInput, Prisma.ConversationMemberUncheckedUpdateWithoutConversationInput>;
};
export type ConversationMemberUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.ConversationMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateManyMutationInput, Prisma.ConversationMemberUncheckedUpdateManyWithoutConversationInput>;
};
export type ConversationMemberCreateWithoutLastReadMessageInput = {
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutConversationJoinedInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMembersInput;
};
export type ConversationMemberUncheckedCreateWithoutLastReadMessageInput = {
    id?: number;
    userId: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
};
export type ConversationMemberCreateOrConnectWithoutLastReadMessageInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput>;
};
export type ConversationMemberCreateManyLastReadMessageInputEnvelope = {
    data: Prisma.ConversationMemberCreateManyLastReadMessageInput | Prisma.ConversationMemberCreateManyLastReadMessageInput[];
    skipDuplicates?: boolean;
};
export type ConversationMemberUpsertWithWhereUniqueWithoutLastReadMessageInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedUpdateWithoutLastReadMessageInput>;
    create: Prisma.XOR<Prisma.ConversationMemberCreateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedCreateWithoutLastReadMessageInput>;
};
export type ConversationMemberUpdateWithWhereUniqueWithoutLastReadMessageInput = {
    where: Prisma.ConversationMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateWithoutLastReadMessageInput, Prisma.ConversationMemberUncheckedUpdateWithoutLastReadMessageInput>;
};
export type ConversationMemberUpdateManyWithWhereWithoutLastReadMessageInput = {
    where: Prisma.ConversationMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateManyMutationInput, Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageInput>;
};
export type ConversationMemberCreateManyUserInput = {
    id?: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberUpdateWithoutUserInput = {
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMembersNestedInput;
    lastReadMessage?: Prisma.MessageUpdateOneWithoutReadByMembersNestedInput;
};
export type ConversationMemberUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberCreateManyConversationInput = {
    id?: number;
    userId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    lastReadMessageId?: number | null;
    clearedAt?: Date | string | null;
};
export type ConversationMemberUpdateWithoutConversationInput = {
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutConversationJoinedNestedInput;
    lastReadMessage?: Prisma.MessageUpdateOneWithoutReadByMembersNestedInput;
};
export type ConversationMemberUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadMessageId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberCreateManyLastReadMessageInput = {
    id?: number;
    userId: number;
    conversationId: number;
    role?: $Enums.MemberRole;
    joinedAt?: Date | string;
    clearedAt?: Date | string | null;
};
export type ConversationMemberUpdateWithoutLastReadMessageInput = {
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutConversationJoinedNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMembersNestedInput;
};
export type ConversationMemberUncheckedUpdateWithoutLastReadMessageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberUncheckedUpdateManyWithoutLastReadMessageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    role?: Prisma.EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clearedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    conversationId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    lastReadMessageId?: boolean;
    clearedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
}, ExtArgs["result"]["conversationMember"]>;
export type ConversationMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    conversationId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    lastReadMessageId?: boolean;
    clearedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
}, ExtArgs["result"]["conversationMember"]>;
export type ConversationMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    conversationId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    lastReadMessageId?: boolean;
    clearedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
}, ExtArgs["result"]["conversationMember"]>;
export type ConversationMemberSelectScalar = {
    id?: boolean;
    userId?: boolean;
    conversationId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    lastReadMessageId?: boolean;
    clearedAt?: boolean;
};
export type ConversationMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "conversationId" | "role" | "joinedAt" | "lastReadMessageId" | "clearedAt", ExtArgs["result"]["conversationMember"]>;
export type ConversationMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
};
export type ConversationMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
};
export type ConversationMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    lastReadMessage?: boolean | Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>;
};
export type $ConversationMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConversationMember";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        lastReadMessage: Prisma.$MessagePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        conversationId: number;
        role: $Enums.MemberRole;
        joinedAt: Date;
        lastReadMessageId: number | null;
        clearedAt: Date | null;
    }, ExtArgs["result"]["conversationMember"]>;
    composites: {};
};
export type ConversationMemberGetPayload<S extends boolean | null | undefined | ConversationMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload, S>;
export type ConversationMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationMemberCountAggregateInputType | true;
};
export interface ConversationMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConversationMember'];
        meta: {
            name: 'ConversationMember';
        };
    };
    findUnique<T extends ConversationMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationMemberFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationMemberCreateArgs>(args: Prisma.SelectSubset<T, ConversationMemberCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationMemberDeleteArgs>(args: Prisma.SelectSubset<T, ConversationMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationMemberUpdateArgs>(args: Prisma.SelectSubset<T, ConversationMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationMemberUpsertArgs>(args: Prisma.SelectSubset<T, ConversationMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationMemberClient<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationMemberCountArgs>(args?: Prisma.Subset<T, ConversationMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationMemberCountAggregateOutputType> : number>;
    aggregate<T extends ConversationMemberAggregateArgs>(args: Prisma.Subset<T, ConversationMemberAggregateArgs>): Prisma.PrismaPromise<GetConversationMemberAggregateType<T>>;
    groupBy<T extends ConversationMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationMemberFieldRefs;
}
export interface Prisma__ConversationMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lastReadMessage<T extends Prisma.ConversationMember$lastReadMessageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationMember$lastReadMessageArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationMemberFieldRefs {
    readonly id: Prisma.FieldRef<"ConversationMember", 'Int'>;
    readonly userId: Prisma.FieldRef<"ConversationMember", 'Int'>;
    readonly conversationId: Prisma.FieldRef<"ConversationMember", 'Int'>;
    readonly role: Prisma.FieldRef<"ConversationMember", 'MemberRole'>;
    readonly joinedAt: Prisma.FieldRef<"ConversationMember", 'DateTime'>;
    readonly lastReadMessageId: Prisma.FieldRef<"ConversationMember", 'Int'>;
    readonly clearedAt: Prisma.FieldRef<"ConversationMember", 'DateTime'>;
}
export type ConversationMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where: Prisma.ConversationMemberWhereUniqueInput;
};
export type ConversationMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where: Prisma.ConversationMemberWhereUniqueInput;
};
export type ConversationMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where?: Prisma.ConversationMemberWhereInput;
    orderBy?: Prisma.ConversationMemberOrderByWithRelationInput | Prisma.ConversationMemberOrderByWithRelationInput[];
    cursor?: Prisma.ConversationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationMemberScalarFieldEnum | Prisma.ConversationMemberScalarFieldEnum[];
};
export type ConversationMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where?: Prisma.ConversationMemberWhereInput;
    orderBy?: Prisma.ConversationMemberOrderByWithRelationInput | Prisma.ConversationMemberOrderByWithRelationInput[];
    cursor?: Prisma.ConversationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationMemberScalarFieldEnum | Prisma.ConversationMemberScalarFieldEnum[];
};
export type ConversationMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where?: Prisma.ConversationMemberWhereInput;
    orderBy?: Prisma.ConversationMemberOrderByWithRelationInput | Prisma.ConversationMemberOrderByWithRelationInput[];
    cursor?: Prisma.ConversationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationMemberScalarFieldEnum | Prisma.ConversationMemberScalarFieldEnum[];
};
export type ConversationMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationMemberCreateInput, Prisma.ConversationMemberUncheckedCreateInput>;
};
export type ConversationMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationMemberCreateManyInput | Prisma.ConversationMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    data: Prisma.ConversationMemberCreateManyInput | Prisma.ConversationMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateInput, Prisma.ConversationMemberUncheckedUpdateInput>;
    where: Prisma.ConversationMemberWhereUniqueInput;
};
export type ConversationMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationMemberUpdateManyMutationInput, Prisma.ConversationMemberUncheckedUpdateManyInput>;
    where?: Prisma.ConversationMemberWhereInput;
    limit?: number;
};
export type ConversationMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationMemberUpdateManyMutationInput, Prisma.ConversationMemberUncheckedUpdateManyInput>;
    where?: Prisma.ConversationMemberWhereInput;
    limit?: number;
    include?: Prisma.ConversationMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where: Prisma.ConversationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationMemberCreateInput, Prisma.ConversationMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationMemberUpdateInput, Prisma.ConversationMemberUncheckedUpdateInput>;
};
export type ConversationMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
    where: Prisma.ConversationMemberWhereUniqueInput;
};
export type ConversationMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationMemberWhereInput;
    limit?: number;
};
export type ConversationMember$lastReadMessageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
};
export type ConversationMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationMemberSelect<ExtArgs> | null;
    omit?: Prisma.ConversationMemberOmit<ExtArgs> | null;
    include?: Prisma.ConversationMemberInclude<ExtArgs> | null;
};
export {};
