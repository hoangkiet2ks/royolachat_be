import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FriendshipModel = runtime.Types.Result.DefaultSelection<Prisma.$FriendshipPayload>;
export type AggregateFriendship = {
    _count: FriendshipCountAggregateOutputType | null;
    _avg: FriendshipAvgAggregateOutputType | null;
    _sum: FriendshipSumAggregateOutputType | null;
    _min: FriendshipMinAggregateOutputType | null;
    _max: FriendshipMaxAggregateOutputType | null;
};
export type FriendshipAvgAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
};
export type FriendshipSumAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
};
export type FriendshipMinAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
    status: $Enums.FriendshipStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FriendshipMaxAggregateOutputType = {
    id: number | null;
    requesterId: number | null;
    receiverId: number | null;
    status: $Enums.FriendshipStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FriendshipCountAggregateOutputType = {
    id: number;
    requesterId: number;
    receiverId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FriendshipAvgAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
};
export type FriendshipSumAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
};
export type FriendshipMinAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FriendshipMaxAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FriendshipCountAggregateInputType = {
    id?: true;
    requesterId?: true;
    receiverId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FriendshipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FriendshipCountAggregateInputType;
    _avg?: FriendshipAvgAggregateInputType;
    _sum?: FriendshipSumAggregateInputType;
    _min?: FriendshipMinAggregateInputType;
    _max?: FriendshipMaxAggregateInputType;
};
export type GetFriendshipAggregateType<T extends FriendshipAggregateArgs> = {
    [P in keyof T & keyof AggregateFriendship]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFriendship[P]> : Prisma.GetScalarType<T[P], AggregateFriendship[P]>;
};
export type FriendshipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithAggregationInput | Prisma.FriendshipOrderByWithAggregationInput[];
    by: Prisma.FriendshipScalarFieldEnum[] | Prisma.FriendshipScalarFieldEnum;
    having?: Prisma.FriendshipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FriendshipCountAggregateInputType | true;
    _avg?: FriendshipAvgAggregateInputType;
    _sum?: FriendshipSumAggregateInputType;
    _min?: FriendshipMinAggregateInputType;
    _max?: FriendshipMaxAggregateInputType;
};
export type FriendshipGroupByOutputType = {
    id: number;
    requesterId: number;
    receiverId: number;
    status: $Enums.FriendshipStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: FriendshipCountAggregateOutputType | null;
    _avg: FriendshipAvgAggregateOutputType | null;
    _sum: FriendshipSumAggregateOutputType | null;
    _min: FriendshipMinAggregateOutputType | null;
    _max: FriendshipMaxAggregateOutputType | null;
};
type GetFriendshipGroupByPayload<T extends FriendshipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FriendshipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FriendshipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FriendshipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FriendshipGroupByOutputType[P]>;
}>>;
export type FriendshipWhereInput = {
    AND?: Prisma.FriendshipWhereInput | Prisma.FriendshipWhereInput[];
    OR?: Prisma.FriendshipWhereInput[];
    NOT?: Prisma.FriendshipWhereInput | Prisma.FriendshipWhereInput[];
    id?: Prisma.IntFilter<"Friendship"> | number;
    requesterId?: Prisma.IntFilter<"Friendship"> | number;
    receiverId?: Prisma.IntFilter<"Friendship"> | number;
    status?: Prisma.EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FriendshipOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    requester?: Prisma.UserOrderByWithRelationInput;
    receiver?: Prisma.UserOrderByWithRelationInput;
};
export type FriendshipWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    requesterId_receiverId?: Prisma.FriendshipRequesterIdReceiverIdCompoundUniqueInput;
    AND?: Prisma.FriendshipWhereInput | Prisma.FriendshipWhereInput[];
    OR?: Prisma.FriendshipWhereInput[];
    NOT?: Prisma.FriendshipWhereInput | Prisma.FriendshipWhereInput[];
    requesterId?: Prisma.IntFilter<"Friendship"> | number;
    receiverId?: Prisma.IntFilter<"Friendship"> | number;
    status?: Prisma.EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "requesterId_receiverId">;
export type FriendshipOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FriendshipCountOrderByAggregateInput;
    _avg?: Prisma.FriendshipAvgOrderByAggregateInput;
    _max?: Prisma.FriendshipMaxOrderByAggregateInput;
    _min?: Prisma.FriendshipMinOrderByAggregateInput;
    _sum?: Prisma.FriendshipSumOrderByAggregateInput;
};
export type FriendshipScalarWhereWithAggregatesInput = {
    AND?: Prisma.FriendshipScalarWhereWithAggregatesInput | Prisma.FriendshipScalarWhereWithAggregatesInput[];
    OR?: Prisma.FriendshipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FriendshipScalarWhereWithAggregatesInput | Prisma.FriendshipScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Friendship"> | number;
    requesterId?: Prisma.IntWithAggregatesFilter<"Friendship"> | number;
    receiverId?: Prisma.IntWithAggregatesFilter<"Friendship"> | number;
    status?: Prisma.EnumFriendshipStatusWithAggregatesFilter<"Friendship"> | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Friendship"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Friendship"> | Date | string;
};
export type FriendshipCreateInput = {
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    requester: Prisma.UserCreateNestedOneWithoutFriendRequestsSentInput;
    receiver: Prisma.UserCreateNestedOneWithoutFriendRequestsReceivedInput;
};
export type FriendshipUncheckedCreateInput = {
    id?: number;
    requesterId: number;
    receiverId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipUpdateInput = {
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: Prisma.UserUpdateOneRequiredWithoutFriendRequestsSentNestedInput;
    receiver?: Prisma.UserUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput;
};
export type FriendshipUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipCreateManyInput = {
    id?: number;
    requesterId: number;
    receiverId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipUpdateManyMutationInput = {
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipListRelationFilter = {
    every?: Prisma.FriendshipWhereInput;
    some?: Prisma.FriendshipWhereInput;
    none?: Prisma.FriendshipWhereInput;
};
export type FriendshipOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FriendshipRequesterIdReceiverIdCompoundUniqueInput = {
    requesterId: number;
    receiverId: number;
};
export type FriendshipCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FriendshipAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
};
export type FriendshipMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FriendshipMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FriendshipSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
};
export type FriendshipCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput> | Prisma.FriendshipCreateWithoutRequesterInput[] | Prisma.FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutRequesterInput | Prisma.FriendshipCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.FriendshipCreateManyRequesterInputEnvelope;
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
};
export type FriendshipCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput> | Prisma.FriendshipCreateWithoutReceiverInput[] | Prisma.FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutReceiverInput | Prisma.FriendshipCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.FriendshipCreateManyReceiverInputEnvelope;
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
};
export type FriendshipUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput> | Prisma.FriendshipCreateWithoutRequesterInput[] | Prisma.FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutRequesterInput | Prisma.FriendshipCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.FriendshipCreateManyRequesterInputEnvelope;
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
};
export type FriendshipUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput> | Prisma.FriendshipCreateWithoutReceiverInput[] | Prisma.FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutReceiverInput | Prisma.FriendshipCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.FriendshipCreateManyReceiverInputEnvelope;
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
};
export type FriendshipUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput> | Prisma.FriendshipCreateWithoutRequesterInput[] | Prisma.FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutRequesterInput | Prisma.FriendshipCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.FriendshipUpsertWithWhereUniqueWithoutRequesterInput | Prisma.FriendshipUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.FriendshipCreateManyRequesterInputEnvelope;
    set?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    disconnect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    delete?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    update?: Prisma.FriendshipUpdateWithWhereUniqueWithoutRequesterInput | Prisma.FriendshipUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.FriendshipUpdateManyWithWhereWithoutRequesterInput | Prisma.FriendshipUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
};
export type FriendshipUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput> | Prisma.FriendshipCreateWithoutReceiverInput[] | Prisma.FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutReceiverInput | Prisma.FriendshipCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.FriendshipUpsertWithWhereUniqueWithoutReceiverInput | Prisma.FriendshipUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.FriendshipCreateManyReceiverInputEnvelope;
    set?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    disconnect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    delete?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    update?: Prisma.FriendshipUpdateWithWhereUniqueWithoutReceiverInput | Prisma.FriendshipUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.FriendshipUpdateManyWithWhereWithoutReceiverInput | Prisma.FriendshipUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
};
export type FriendshipUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput> | Prisma.FriendshipCreateWithoutRequesterInput[] | Prisma.FriendshipUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutRequesterInput | Prisma.FriendshipCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.FriendshipUpsertWithWhereUniqueWithoutRequesterInput | Prisma.FriendshipUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.FriendshipCreateManyRequesterInputEnvelope;
    set?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    disconnect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    delete?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    update?: Prisma.FriendshipUpdateWithWhereUniqueWithoutRequesterInput | Prisma.FriendshipUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.FriendshipUpdateManyWithWhereWithoutRequesterInput | Prisma.FriendshipUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
};
export type FriendshipUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput> | Prisma.FriendshipCreateWithoutReceiverInput[] | Prisma.FriendshipUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.FriendshipCreateOrConnectWithoutReceiverInput | Prisma.FriendshipCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.FriendshipUpsertWithWhereUniqueWithoutReceiverInput | Prisma.FriendshipUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.FriendshipCreateManyReceiverInputEnvelope;
    set?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    disconnect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    delete?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    connect?: Prisma.FriendshipWhereUniqueInput | Prisma.FriendshipWhereUniqueInput[];
    update?: Prisma.FriendshipUpdateWithWhereUniqueWithoutReceiverInput | Prisma.FriendshipUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.FriendshipUpdateManyWithWhereWithoutReceiverInput | Prisma.FriendshipUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
};
export type EnumFriendshipStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendshipStatus;
};
export type FriendshipCreateWithoutRequesterInput = {
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receiver: Prisma.UserCreateNestedOneWithoutFriendRequestsReceivedInput;
};
export type FriendshipUncheckedCreateWithoutRequesterInput = {
    id?: number;
    receiverId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipCreateOrConnectWithoutRequesterInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput>;
};
export type FriendshipCreateManyRequesterInputEnvelope = {
    data: Prisma.FriendshipCreateManyRequesterInput | Prisma.FriendshipCreateManyRequesterInput[];
    skipDuplicates?: boolean;
};
export type FriendshipCreateWithoutReceiverInput = {
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    requester: Prisma.UserCreateNestedOneWithoutFriendRequestsSentInput;
};
export type FriendshipUncheckedCreateWithoutReceiverInput = {
    id?: number;
    requesterId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipCreateOrConnectWithoutReceiverInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput>;
};
export type FriendshipCreateManyReceiverInputEnvelope = {
    data: Prisma.FriendshipCreateManyReceiverInput | Prisma.FriendshipCreateManyReceiverInput[];
    skipDuplicates?: boolean;
};
export type FriendshipUpsertWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    update: Prisma.XOR<Prisma.FriendshipUpdateWithoutRequesterInput, Prisma.FriendshipUncheckedUpdateWithoutRequesterInput>;
    create: Prisma.XOR<Prisma.FriendshipCreateWithoutRequesterInput, Prisma.FriendshipUncheckedCreateWithoutRequesterInput>;
};
export type FriendshipUpdateWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    data: Prisma.XOR<Prisma.FriendshipUpdateWithoutRequesterInput, Prisma.FriendshipUncheckedUpdateWithoutRequesterInput>;
};
export type FriendshipUpdateManyWithWhereWithoutRequesterInput = {
    where: Prisma.FriendshipScalarWhereInput;
    data: Prisma.XOR<Prisma.FriendshipUpdateManyMutationInput, Prisma.FriendshipUncheckedUpdateManyWithoutRequesterInput>;
};
export type FriendshipScalarWhereInput = {
    AND?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
    OR?: Prisma.FriendshipScalarWhereInput[];
    NOT?: Prisma.FriendshipScalarWhereInput | Prisma.FriendshipScalarWhereInput[];
    id?: Prisma.IntFilter<"Friendship"> | number;
    requesterId?: Prisma.IntFilter<"Friendship"> | number;
    receiverId?: Prisma.IntFilter<"Friendship"> | number;
    status?: Prisma.EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Friendship"> | Date | string;
};
export type FriendshipUpsertWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    update: Prisma.XOR<Prisma.FriendshipUpdateWithoutReceiverInput, Prisma.FriendshipUncheckedUpdateWithoutReceiverInput>;
    create: Prisma.XOR<Prisma.FriendshipCreateWithoutReceiverInput, Prisma.FriendshipUncheckedCreateWithoutReceiverInput>;
};
export type FriendshipUpdateWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.FriendshipWhereUniqueInput;
    data: Prisma.XOR<Prisma.FriendshipUpdateWithoutReceiverInput, Prisma.FriendshipUncheckedUpdateWithoutReceiverInput>;
};
export type FriendshipUpdateManyWithWhereWithoutReceiverInput = {
    where: Prisma.FriendshipScalarWhereInput;
    data: Prisma.XOR<Prisma.FriendshipUpdateManyMutationInput, Prisma.FriendshipUncheckedUpdateManyWithoutReceiverInput>;
};
export type FriendshipCreateManyRequesterInput = {
    id?: number;
    receiverId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipCreateManyReceiverInput = {
    id?: number;
    requesterId: number;
    status?: $Enums.FriendshipStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FriendshipUpdateWithoutRequesterInput = {
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiver?: Prisma.UserUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput;
};
export type FriendshipUncheckedUpdateWithoutRequesterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipUncheckedUpdateManyWithoutRequesterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipUpdateWithoutReceiverInput = {
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: Prisma.UserUpdateOneRequiredWithoutFriendRequestsSentNestedInput;
};
export type FriendshipUncheckedUpdateWithoutReceiverInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipUncheckedUpdateManyWithoutReceiverInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FriendshipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    receiverId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["friendship"]>;
export type FriendshipSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    receiverId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["friendship"]>;
export type FriendshipSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requesterId?: boolean;
    receiverId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["friendship"]>;
export type FriendshipSelectScalar = {
    id?: boolean;
    requesterId?: boolean;
    receiverId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FriendshipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requesterId" | "receiverId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["friendship"]>;
export type FriendshipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FriendshipIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FriendshipIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FriendshipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Friendship";
    objects: {
        requester: Prisma.$UserPayload<ExtArgs>;
        receiver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        requesterId: number;
        receiverId: number;
        status: $Enums.FriendshipStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["friendship"]>;
    composites: {};
};
export type FriendshipGetPayload<S extends boolean | null | undefined | FriendshipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FriendshipPayload, S>;
export type FriendshipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FriendshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FriendshipCountAggregateInputType | true;
};
export interface FriendshipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Friendship'];
        meta: {
            name: 'Friendship';
        };
    };
    findUnique<T extends FriendshipFindUniqueArgs>(args: Prisma.SelectSubset<T, FriendshipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FriendshipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FriendshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FriendshipFindFirstArgs>(args?: Prisma.SelectSubset<T, FriendshipFindFirstArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FriendshipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FriendshipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FriendshipFindManyArgs>(args?: Prisma.SelectSubset<T, FriendshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FriendshipCreateArgs>(args: Prisma.SelectSubset<T, FriendshipCreateArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FriendshipCreateManyArgs>(args?: Prisma.SelectSubset<T, FriendshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FriendshipCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FriendshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FriendshipDeleteArgs>(args: Prisma.SelectSubset<T, FriendshipDeleteArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FriendshipUpdateArgs>(args: Prisma.SelectSubset<T, FriendshipUpdateArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FriendshipDeleteManyArgs>(args?: Prisma.SelectSubset<T, FriendshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FriendshipUpdateManyArgs>(args: Prisma.SelectSubset<T, FriendshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FriendshipUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FriendshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FriendshipUpsertArgs>(args: Prisma.SelectSubset<T, FriendshipUpsertArgs<ExtArgs>>): Prisma.Prisma__FriendshipClient<runtime.Types.Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FriendshipCountArgs>(args?: Prisma.Subset<T, FriendshipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FriendshipCountAggregateOutputType> : number>;
    aggregate<T extends FriendshipAggregateArgs>(args: Prisma.Subset<T, FriendshipAggregateArgs>): Prisma.PrismaPromise<GetFriendshipAggregateType<T>>;
    groupBy<T extends FriendshipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FriendshipGroupByArgs['orderBy'];
    } : {
        orderBy?: FriendshipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FriendshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FriendshipFieldRefs;
}
export interface Prisma__FriendshipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    requester<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receiver<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FriendshipFieldRefs {
    readonly id: Prisma.FieldRef<"Friendship", 'Int'>;
    readonly requesterId: Prisma.FieldRef<"Friendship", 'Int'>;
    readonly receiverId: Prisma.FieldRef<"Friendship", 'Int'>;
    readonly status: Prisma.FieldRef<"Friendship", 'FriendshipStatus'>;
    readonly createdAt: Prisma.FieldRef<"Friendship", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Friendship", 'DateTime'>;
}
export type FriendshipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where: Prisma.FriendshipWhereUniqueInput;
};
export type FriendshipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where: Prisma.FriendshipWhereUniqueInput;
};
export type FriendshipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FriendshipScalarFieldEnum | Prisma.FriendshipScalarFieldEnum[];
};
export type FriendshipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FriendshipScalarFieldEnum | Prisma.FriendshipScalarFieldEnum[];
};
export type FriendshipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where?: Prisma.FriendshipWhereInput;
    orderBy?: Prisma.FriendshipOrderByWithRelationInput | Prisma.FriendshipOrderByWithRelationInput[];
    cursor?: Prisma.FriendshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FriendshipScalarFieldEnum | Prisma.FriendshipScalarFieldEnum[];
};
export type FriendshipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FriendshipCreateInput, Prisma.FriendshipUncheckedCreateInput>;
};
export type FriendshipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FriendshipCreateManyInput | Prisma.FriendshipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FriendshipCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    data: Prisma.FriendshipCreateManyInput | Prisma.FriendshipCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FriendshipIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FriendshipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FriendshipUpdateInput, Prisma.FriendshipUncheckedUpdateInput>;
    where: Prisma.FriendshipWhereUniqueInput;
};
export type FriendshipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FriendshipUpdateManyMutationInput, Prisma.FriendshipUncheckedUpdateManyInput>;
    where?: Prisma.FriendshipWhereInput;
    limit?: number;
};
export type FriendshipUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FriendshipUpdateManyMutationInput, Prisma.FriendshipUncheckedUpdateManyInput>;
    where?: Prisma.FriendshipWhereInput;
    limit?: number;
    include?: Prisma.FriendshipIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FriendshipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where: Prisma.FriendshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.FriendshipCreateInput, Prisma.FriendshipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FriendshipUpdateInput, Prisma.FriendshipUncheckedUpdateInput>;
};
export type FriendshipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
    where: Prisma.FriendshipWhereUniqueInput;
};
export type FriendshipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FriendshipWhereInput;
    limit?: number;
};
export type FriendshipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FriendshipSelect<ExtArgs> | null;
    omit?: Prisma.FriendshipOmit<ExtArgs> | null;
    include?: Prisma.FriendshipInclude<ExtArgs> | null;
};
export {};
