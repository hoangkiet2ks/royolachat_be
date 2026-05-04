import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type MessageModel = runtime.Types.Result.DefaultSelection<Prisma.$MessagePayload>;
export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _avg: MessageAvgAggregateOutputType | null;
    _sum: MessageSumAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
export type MessageAvgAggregateOutputType = {
    id: number | null;
    replyToId: number | null;
    senderId: number | null;
    conversationId: number | null;
    deletedByIds: number | null;
};
export type MessageSumAggregateOutputType = {
    id: number | null;
    replyToId: number | null;
    senderId: number | null;
    conversationId: number | null;
    deletedByIds: number[];
};
export type MessageMinAggregateOutputType = {
    id: number | null;
    content: string | null;
    fileUrl: string | null;
    type: $Enums.MessageType | null;
    isRecalled: boolean | null;
    replyToId: number | null;
    senderId: number | null;
    conversationId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isPinned: boolean | null;
};
export type MessageMaxAggregateOutputType = {
    id: number | null;
    content: string | null;
    fileUrl: string | null;
    type: $Enums.MessageType | null;
    isRecalled: boolean | null;
    replyToId: number | null;
    senderId: number | null;
    conversationId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isPinned: boolean | null;
};
export type MessageCountAggregateOutputType = {
    id: number;
    content: number;
    fileUrl: number;
    type: number;
    isRecalled: number;
    replyToId: number;
    senderId: number;
    conversationId: number;
    createdAt: number;
    updatedAt: number;
    deletedByIds: number;
    isPinned: number;
    _all: number;
};
export type MessageAvgAggregateInputType = {
    id?: true;
    replyToId?: true;
    senderId?: true;
    conversationId?: true;
    deletedByIds?: true;
};
export type MessageSumAggregateInputType = {
    id?: true;
    replyToId?: true;
    senderId?: true;
    conversationId?: true;
    deletedByIds?: true;
};
export type MessageMinAggregateInputType = {
    id?: true;
    content?: true;
    fileUrl?: true;
    type?: true;
    isRecalled?: true;
    replyToId?: true;
    senderId?: true;
    conversationId?: true;
    createdAt?: true;
    updatedAt?: true;
    isPinned?: true;
};
export type MessageMaxAggregateInputType = {
    id?: true;
    content?: true;
    fileUrl?: true;
    type?: true;
    isRecalled?: true;
    replyToId?: true;
    senderId?: true;
    conversationId?: true;
    createdAt?: true;
    updatedAt?: true;
    isPinned?: true;
};
export type MessageCountAggregateInputType = {
    id?: true;
    content?: true;
    fileUrl?: true;
    type?: true;
    isRecalled?: true;
    replyToId?: true;
    senderId?: true;
    conversationId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedByIds?: true;
    isPinned?: true;
    _all?: true;
};
export type MessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageCountAggregateInputType;
    _avg?: MessageAvgAggregateInputType;
    _sum?: MessageSumAggregateInputType;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessage[P]> : Prisma.GetScalarType<T[P], AggregateMessage[P]>;
};
export type MessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithAggregationInput | Prisma.MessageOrderByWithAggregationInput[];
    by: Prisma.MessageScalarFieldEnum[] | Prisma.MessageScalarFieldEnum;
    having?: Prisma.MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _avg?: MessageAvgAggregateInputType;
    _sum?: MessageSumAggregateInputType;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type MessageGroupByOutputType = {
    id: number;
    content: string | null;
    fileUrl: string | null;
    type: $Enums.MessageType;
    isRecalled: boolean;
    replyToId: number | null;
    senderId: number;
    conversationId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedByIds: number[];
    isPinned: boolean;
    _count: MessageCountAggregateOutputType | null;
    _avg: MessageAvgAggregateOutputType | null;
    _sum: MessageSumAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]>;
}>>;
export type MessageWhereInput = {
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    id?: Prisma.IntFilter<"Message"> | number;
    content?: Prisma.StringNullableFilter<"Message"> | string | null;
    fileUrl?: Prisma.StringNullableFilter<"Message"> | string | null;
    type?: Prisma.EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
    isRecalled?: Prisma.BoolFilter<"Message"> | boolean;
    replyToId?: Prisma.IntNullableFilter<"Message"> | number | null;
    senderId?: Prisma.IntFilter<"Message"> | number;
    conversationId?: Prisma.IntFilter<"Message"> | number;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    deletedByIds?: Prisma.IntNullableListFilter<"Message">;
    isPinned?: Prisma.BoolFilter<"Message"> | boolean;
    replyTo?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.MessageWhereInput> | null;
    replies?: Prisma.MessageListRelationFilter;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    readByMembers?: Prisma.ConversationMemberListRelationFilter;
    reactions?: Prisma.MessageReactionListRelationFilter;
};
export type MessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedByIds?: Prisma.SortOrder;
    isPinned?: Prisma.SortOrder;
    replyTo?: Prisma.MessageOrderByWithRelationInput;
    replies?: Prisma.MessageOrderByRelationAggregateInput;
    sender?: Prisma.UserOrderByWithRelationInput;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    readByMembers?: Prisma.ConversationMemberOrderByRelationAggregateInput;
    reactions?: Prisma.MessageReactionOrderByRelationAggregateInput;
};
export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    content?: Prisma.StringNullableFilter<"Message"> | string | null;
    fileUrl?: Prisma.StringNullableFilter<"Message"> | string | null;
    type?: Prisma.EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
    isRecalled?: Prisma.BoolFilter<"Message"> | boolean;
    replyToId?: Prisma.IntNullableFilter<"Message"> | number | null;
    senderId?: Prisma.IntFilter<"Message"> | number;
    conversationId?: Prisma.IntFilter<"Message"> | number;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    deletedByIds?: Prisma.IntNullableListFilter<"Message">;
    isPinned?: Prisma.BoolFilter<"Message"> | boolean;
    replyTo?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.MessageWhereInput> | null;
    replies?: Prisma.MessageListRelationFilter;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    readByMembers?: Prisma.ConversationMemberListRelationFilter;
    reactions?: Prisma.MessageReactionListRelationFilter;
}, "id">;
export type MessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedByIds?: Prisma.SortOrder;
    isPinned?: Prisma.SortOrder;
    _count?: Prisma.MessageCountOrderByAggregateInput;
    _avg?: Prisma.MessageAvgOrderByAggregateInput;
    _max?: Prisma.MessageMaxOrderByAggregateInput;
    _min?: Prisma.MessageMinOrderByAggregateInput;
    _sum?: Prisma.MessageSumOrderByAggregateInput;
};
export type MessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Message"> | number;
    content?: Prisma.StringNullableWithAggregatesFilter<"Message"> | string | null;
    fileUrl?: Prisma.StringNullableWithAggregatesFilter<"Message"> | string | null;
    type?: Prisma.EnumMessageTypeWithAggregatesFilter<"Message"> | $Enums.MessageType;
    isRecalled?: Prisma.BoolWithAggregatesFilter<"Message"> | boolean;
    replyToId?: Prisma.IntNullableWithAggregatesFilter<"Message"> | number | null;
    senderId?: Prisma.IntWithAggregatesFilter<"Message"> | number;
    conversationId?: Prisma.IntWithAggregatesFilter<"Message"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Message"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Message"> | Date | string;
    deletedByIds?: Prisma.IntNullableListFilter<"Message">;
    isPinned?: Prisma.BoolWithAggregatesFilter<"Message"> | boolean;
};
export type MessageCreateInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageUpdateInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageCreateManyInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
};
export type MessageUpdateManyMutationInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type MessageUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type MessageListRelationFilter = {
    every?: Prisma.MessageWhereInput;
    some?: Prisma.MessageWhereInput;
    none?: Prisma.MessageWhereInput;
};
export type MessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MessageNullableScalarRelationFilter = {
    is?: Prisma.MessageWhereInput | null;
    isNot?: Prisma.MessageWhereInput | null;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type MessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedByIds?: Prisma.SortOrder;
    isPinned?: Prisma.SortOrder;
};
export type MessageAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    deletedByIds?: Prisma.SortOrder;
};
export type MessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isPinned?: Prisma.SortOrder;
};
export type MessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isPinned?: Prisma.SortOrder;
};
export type MessageSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    replyToId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    deletedByIds?: Prisma.SortOrder;
};
export type MessageScalarRelationFilter = {
    is?: Prisma.MessageWhereInput;
    isNot?: Prisma.MessageWhereInput;
};
export type MessageCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutConversationInput | Prisma.MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutConversationInput | Prisma.MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateNestedOneWithoutReadByMembersInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReadByMembersInput, Prisma.MessageUncheckedCreateWithoutReadByMembersInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReadByMembersInput;
    connect?: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateOneWithoutReadByMembersNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReadByMembersInput, Prisma.MessageUncheckedCreateWithoutReadByMembersInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReadByMembersInput;
    upsert?: Prisma.MessageUpsertWithoutReadByMembersInput;
    disconnect?: Prisma.MessageWhereInput | boolean;
    delete?: Prisma.MessageWhereInput | boolean;
    connect?: Prisma.MessageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageUpdateToOneWithWhereWithoutReadByMembersInput, Prisma.MessageUpdateWithoutReadByMembersInput>, Prisma.MessageUncheckedUpdateWithoutReadByMembersInput>;
};
export type MessageCreatedeletedByIdsInput = {
    set: number[];
};
export type MessageCreateNestedOneWithoutRepliesInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutRepliesInput, Prisma.MessageUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutRepliesInput;
    connect?: Prisma.MessageWhereUniqueInput;
};
export type MessageCreateNestedManyWithoutReplyToInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput> | Prisma.MessageCreateWithoutReplyToInput[] | Prisma.MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReplyToInput | Prisma.MessageCreateOrConnectWithoutReplyToInput[];
    createMany?: Prisma.MessageCreateManyReplyToInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutReplyToInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput> | Prisma.MessageCreateWithoutReplyToInput[] | Prisma.MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReplyToInput | Prisma.MessageCreateOrConnectWithoutReplyToInput[];
    createMany?: Prisma.MessageCreateManyReplyToInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType;
};
export type MessageUpdatedeletedByIdsInput = {
    set?: number[];
    push?: number | number[];
};
export type MessageUpdateOneWithoutRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutRepliesInput, Prisma.MessageUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutRepliesInput;
    upsert?: Prisma.MessageUpsertWithoutRepliesInput;
    disconnect?: Prisma.MessageWhereInput | boolean;
    delete?: Prisma.MessageWhereInput | boolean;
    connect?: Prisma.MessageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageUpdateToOneWithWhereWithoutRepliesInput, Prisma.MessageUpdateWithoutRepliesInput>, Prisma.MessageUncheckedUpdateWithoutRepliesInput>;
};
export type MessageUpdateManyWithoutReplyToNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput> | Prisma.MessageCreateWithoutReplyToInput[] | Prisma.MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReplyToInput | Prisma.MessageCreateOrConnectWithoutReplyToInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutReplyToInput | Prisma.MessageUpsertWithWhereUniqueWithoutReplyToInput[];
    createMany?: Prisma.MessageCreateManyReplyToInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutReplyToInput | Prisma.MessageUpdateWithWhereUniqueWithoutReplyToInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutReplyToInput | Prisma.MessageUpdateManyWithWhereWithoutReplyToInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutReplyToNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput> | Prisma.MessageCreateWithoutReplyToInput[] | Prisma.MessageUncheckedCreateWithoutReplyToInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReplyToInput | Prisma.MessageCreateOrConnectWithoutReplyToInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutReplyToInput | Prisma.MessageUpsertWithWhereUniqueWithoutReplyToInput[];
    createMany?: Prisma.MessageCreateManyReplyToInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutReplyToInput | Prisma.MessageUpdateWithWhereUniqueWithoutReplyToInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutReplyToInput | Prisma.MessageUpdateManyWithWhereWithoutReplyToInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReactionsInput, Prisma.MessageUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReactionsInput, Prisma.MessageUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.MessageUpsertWithoutReactionsInput;
    connect?: Prisma.MessageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageUpdateToOneWithWhereWithoutReactionsInput, Prisma.MessageUpdateWithoutReactionsInput>, Prisma.MessageUncheckedUpdateWithoutReactionsInput>;
};
export type MessageCreateWithoutSenderInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutSenderInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageCreateManySenderInputEnvelope = {
    data: Prisma.MessageCreateManySenderInput | Prisma.MessageCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
};
export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutSenderInput>;
};
export type MessageScalarWhereInput = {
    AND?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    OR?: Prisma.MessageScalarWhereInput[];
    NOT?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    id?: Prisma.IntFilter<"Message"> | number;
    content?: Prisma.StringNullableFilter<"Message"> | string | null;
    fileUrl?: Prisma.StringNullableFilter<"Message"> | string | null;
    type?: Prisma.EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
    isRecalled?: Prisma.BoolFilter<"Message"> | boolean;
    replyToId?: Prisma.IntNullableFilter<"Message"> | number | null;
    senderId?: Prisma.IntFilter<"Message"> | number;
    conversationId?: Prisma.IntFilter<"Message"> | number;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    deletedByIds?: Prisma.IntNullableListFilter<"Message">;
    isPinned?: Prisma.BoolFilter<"Message"> | boolean;
};
export type MessageCreateWithoutConversationInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutConversationInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput>;
};
export type MessageCreateManyConversationInputEnvelope = {
    data: Prisma.MessageCreateManyConversationInput | Prisma.MessageCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutConversationInput, Prisma.MessageUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput>;
};
export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutConversationInput, Prisma.MessageUncheckedUpdateWithoutConversationInput>;
};
export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutConversationInput>;
};
export type MessageCreateWithoutReadByMembersInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutReadByMembersInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutReadByMembersInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReadByMembersInput, Prisma.MessageUncheckedCreateWithoutReadByMembersInput>;
};
export type MessageUpsertWithoutReadByMembersInput = {
    update: Prisma.XOR<Prisma.MessageUpdateWithoutReadByMembersInput, Prisma.MessageUncheckedUpdateWithoutReadByMembersInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReadByMembersInput, Prisma.MessageUncheckedCreateWithoutReadByMembersInput>;
    where?: Prisma.MessageWhereInput;
};
export type MessageUpdateToOneWithWhereWithoutReadByMembersInput = {
    where?: Prisma.MessageWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutReadByMembersInput, Prisma.MessageUncheckedUpdateWithoutReadByMembersInput>;
};
export type MessageUpdateWithoutReadByMembersInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutReadByMembersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageCreateWithoutRepliesInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutRepliesInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutRepliesInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutRepliesInput, Prisma.MessageUncheckedCreateWithoutRepliesInput>;
};
export type MessageCreateWithoutReplyToInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutReplyToInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
    reactions?: Prisma.MessageReactionUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutReplyToInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput>;
};
export type MessageCreateManyReplyToInputEnvelope = {
    data: Prisma.MessageCreateManyReplyToInput | Prisma.MessageCreateManyReplyToInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithoutRepliesInput = {
    update: Prisma.XOR<Prisma.MessageUpdateWithoutRepliesInput, Prisma.MessageUncheckedUpdateWithoutRepliesInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutRepliesInput, Prisma.MessageUncheckedCreateWithoutRepliesInput>;
    where?: Prisma.MessageWhereInput;
};
export type MessageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: Prisma.MessageWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutRepliesInput, Prisma.MessageUncheckedUpdateWithoutRepliesInput>;
};
export type MessageUpdateWithoutRepliesInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutRepliesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUpsertWithWhereUniqueWithoutReplyToInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutReplyToInput, Prisma.MessageUncheckedUpdateWithoutReplyToInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReplyToInput, Prisma.MessageUncheckedCreateWithoutReplyToInput>;
};
export type MessageUpdateWithWhereUniqueWithoutReplyToInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutReplyToInput, Prisma.MessageUncheckedUpdateWithoutReplyToInput>;
};
export type MessageUpdateManyWithWhereWithoutReplyToInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutReplyToInput>;
};
export type MessageCreateWithoutReactionsInput = {
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replyTo?: Prisma.MessageCreateNestedOneWithoutRepliesInput;
    replies?: Prisma.MessageCreateNestedManyWithoutReplyToInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesInput;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    readByMembers?: Prisma.ConversationMemberCreateNestedManyWithoutLastReadMessageInput;
};
export type MessageUncheckedCreateWithoutReactionsInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
    replies?: Prisma.MessageUncheckedCreateNestedManyWithoutReplyToInput;
    readByMembers?: Prisma.ConversationMemberUncheckedCreateNestedManyWithoutLastReadMessageInput;
};
export type MessageCreateOrConnectWithoutReactionsInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReactionsInput, Prisma.MessageUncheckedCreateWithoutReactionsInput>;
};
export type MessageUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.MessageUpdateWithoutReactionsInput, Prisma.MessageUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReactionsInput, Prisma.MessageUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.MessageWhereInput;
};
export type MessageUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.MessageWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutReactionsInput, Prisma.MessageUncheckedUpdateWithoutReactionsInput>;
};
export type MessageUpdateWithoutReactionsInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
};
export type MessageCreateManySenderInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
};
export type MessageUpdateWithoutSenderInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type MessageCreateManyConversationInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    replyToId?: number | null;
    senderId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
};
export type MessageUpdateWithoutConversationInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyTo?: Prisma.MessageUpdateOneWithoutRepliesNestedInput;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replyToId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type MessageCreateManyReplyToInput = {
    id?: number;
    content?: string | null;
    fileUrl?: string | null;
    type?: $Enums.MessageType;
    isRecalled?: boolean;
    senderId: number;
    conversationId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedByIds?: Prisma.MessageCreatedeletedByIdsInput | number[];
    isPinned?: boolean;
};
export type MessageUpdateWithoutReplyToInput = {
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUpdateManyWithoutReplyToNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    readByMembers?: Prisma.ConversationMemberUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutReplyToInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    replies?: Prisma.MessageUncheckedUpdateManyWithoutReplyToNestedInput;
    readByMembers?: Prisma.ConversationMemberUncheckedUpdateManyWithoutLastReadMessageNestedInput;
    reactions?: Prisma.MessageReactionUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateManyWithoutReplyToInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    conversationId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedByIds?: Prisma.MessageUpdatedeletedByIdsInput | number[];
    isPinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type MessageCountOutputType = {
    replies: number;
    readByMembers: number;
    reactions: number;
};
export type MessageCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replies?: boolean | MessageCountOutputTypeCountRepliesArgs;
    readByMembers?: boolean | MessageCountOutputTypeCountReadByMembersArgs;
    reactions?: boolean | MessageCountOutputTypeCountReactionsArgs;
};
export type MessageCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageCountOutputTypeSelect<ExtArgs> | null;
};
export type MessageCountOutputTypeCountRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type MessageCountOutputTypeCountReadByMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationMemberWhereInput;
};
export type MessageCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageReactionWhereInput;
};
export type MessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    fileUrl?: boolean;
    type?: boolean;
    isRecalled?: boolean;
    replyToId?: boolean;
    senderId?: boolean;
    conversationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedByIds?: boolean;
    isPinned?: boolean;
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    replies?: boolean | Prisma.Message$repliesArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    readByMembers?: boolean | Prisma.Message$readByMembersArgs<ExtArgs>;
    reactions?: boolean | Prisma.Message$reactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    fileUrl?: boolean;
    type?: boolean;
    isRecalled?: boolean;
    replyToId?: boolean;
    senderId?: boolean;
    conversationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedByIds?: boolean;
    isPinned?: boolean;
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    fileUrl?: boolean;
    type?: boolean;
    isRecalled?: boolean;
    replyToId?: boolean;
    senderId?: boolean;
    conversationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedByIds?: boolean;
    isPinned?: boolean;
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectScalar = {
    id?: boolean;
    content?: boolean;
    fileUrl?: boolean;
    type?: boolean;
    isRecalled?: boolean;
    replyToId?: boolean;
    senderId?: boolean;
    conversationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedByIds?: boolean;
    isPinned?: boolean;
};
export type MessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "fileUrl" | "type" | "isRecalled" | "replyToId" | "senderId" | "conversationId" | "createdAt" | "updatedAt" | "deletedByIds" | "isPinned", ExtArgs["result"]["message"]>;
export type MessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    replies?: boolean | Prisma.Message$repliesArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    readByMembers?: boolean | Prisma.Message$readByMembersArgs<ExtArgs>;
    reactions?: boolean | Prisma.Message$reactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type MessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replyTo?: boolean | Prisma.Message$replyToArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
};
export type $MessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Message";
    objects: {
        replyTo: Prisma.$MessagePayload<ExtArgs> | null;
        replies: Prisma.$MessagePayload<ExtArgs>[];
        sender: Prisma.$UserPayload<ExtArgs>;
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        readByMembers: Prisma.$ConversationMemberPayload<ExtArgs>[];
        reactions: Prisma.$MessageReactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        content: string | null;
        fileUrl: string | null;
        type: $Enums.MessageType;
        isRecalled: boolean;
        replyToId: number | null;
        senderId: number;
        conversationId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedByIds: number[];
        isPinned: boolean;
    }, ExtArgs["result"]["message"]>;
    composites: {};
};
export type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessagePayload, S>;
export type MessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
};
export interface MessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Message'];
        meta: {
            name: 'Message';
        };
    };
    findUnique<T extends MessageFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageFindManyArgs>(args?: Prisma.SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageCreateArgs>(args: Prisma.SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MessageDeleteArgs>(args: Prisma.SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageUpdateArgs>(args: Prisma.SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MessageUpsertArgs>(args: Prisma.SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageCountArgs>(args?: Prisma.Subset<T, MessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageCountAggregateOutputType> : number>;
    aggregate<T extends MessageAggregateArgs>(args: Prisma.Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>;
    groupBy<T extends MessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageFieldRefs;
}
export interface Prisma__MessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    replyTo<T extends Prisma.Message$replyToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$replyToArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    replies<T extends Prisma.Message$repliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    readByMembers<T extends Prisma.Message$readByMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$readByMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reactions<T extends Prisma.Message$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageFieldRefs {
    readonly id: Prisma.FieldRef<"Message", 'Int'>;
    readonly content: Prisma.FieldRef<"Message", 'String'>;
    readonly fileUrl: Prisma.FieldRef<"Message", 'String'>;
    readonly type: Prisma.FieldRef<"Message", 'MessageType'>;
    readonly isRecalled: Prisma.FieldRef<"Message", 'Boolean'>;
    readonly replyToId: Prisma.FieldRef<"Message", 'Int'>;
    readonly senderId: Prisma.FieldRef<"Message", 'Int'>;
    readonly conversationId: Prisma.FieldRef<"Message", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Message", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Message", 'DateTime'>;
    readonly deletedByIds: Prisma.FieldRef<"Message", 'Int[]'>;
    readonly isPinned: Prisma.FieldRef<"Message", 'Boolean'>;
}
export type MessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
};
export type MessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageCreateManyInput | Prisma.MessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    data: Prisma.MessageCreateManyInput | Prisma.MessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyInput>;
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type MessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyInput>;
    where?: Prisma.MessageWhereInput;
    limit?: number;
    include?: Prisma.MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
};
export type MessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type Message$replyToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
};
export type Message$repliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type Message$readByMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Message$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
};
export {};
