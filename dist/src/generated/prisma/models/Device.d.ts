import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type DeviceModel = runtime.Types.Result.DefaultSelection<Prisma.$DevicePayload>;
export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null;
    _avg: DeviceAvgAggregateOutputType | null;
    _sum: DeviceSumAggregateOutputType | null;
    _min: DeviceMinAggregateOutputType | null;
    _max: DeviceMaxAggregateOutputType | null;
};
export type DeviceAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type DeviceSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type DeviceMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    userAgent: string | null;
    ip: string | null;
    isActive: boolean | null;
    lastActive: Date | null;
    createdAt: Date | null;
};
export type DeviceMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    userAgent: string | null;
    ip: string | null;
    isActive: boolean | null;
    lastActive: Date | null;
    createdAt: Date | null;
};
export type DeviceCountAggregateOutputType = {
    id: number;
    userId: number;
    userAgent: number;
    ip: number;
    isActive: number;
    lastActive: number;
    createdAt: number;
    _all: number;
};
export type DeviceAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type DeviceSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type DeviceMinAggregateInputType = {
    id?: true;
    userId?: true;
    userAgent?: true;
    ip?: true;
    isActive?: true;
    lastActive?: true;
    createdAt?: true;
};
export type DeviceMaxAggregateInputType = {
    id?: true;
    userId?: true;
    userAgent?: true;
    ip?: true;
    isActive?: true;
    lastActive?: true;
    createdAt?: true;
};
export type DeviceCountAggregateInputType = {
    id?: true;
    userId?: true;
    userAgent?: true;
    ip?: true;
    isActive?: true;
    lastActive?: true;
    createdAt?: true;
    _all?: true;
};
export type DeviceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithRelationInput | Prisma.DeviceOrderByWithRelationInput[];
    cursor?: Prisma.DeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeviceCountAggregateInputType;
    _avg?: DeviceAvgAggregateInputType;
    _sum?: DeviceSumAggregateInputType;
    _min?: DeviceMinAggregateInputType;
    _max?: DeviceMaxAggregateInputType;
};
export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
    [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDevice[P]> : Prisma.GetScalarType<T[P], AggregateDevice[P]>;
};
export type DeviceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithAggregationInput | Prisma.DeviceOrderByWithAggregationInput[];
    by: Prisma.DeviceScalarFieldEnum[] | Prisma.DeviceScalarFieldEnum;
    having?: Prisma.DeviceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeviceCountAggregateInputType | true;
    _avg?: DeviceAvgAggregateInputType;
    _sum?: DeviceSumAggregateInputType;
    _min?: DeviceMinAggregateInputType;
    _max?: DeviceMaxAggregateInputType;
};
export type DeviceGroupByOutputType = {
    id: number;
    userId: number;
    userAgent: string;
    ip: string;
    isActive: boolean;
    lastActive: Date;
    createdAt: Date;
    _count: DeviceCountAggregateOutputType | null;
    _avg: DeviceAvgAggregateOutputType | null;
    _sum: DeviceSumAggregateOutputType | null;
    _min: DeviceMinAggregateOutputType | null;
    _max: DeviceMaxAggregateOutputType | null;
};
type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeviceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeviceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeviceGroupByOutputType[P]>;
}>>;
export type DeviceWhereInput = {
    AND?: Prisma.DeviceWhereInput | Prisma.DeviceWhereInput[];
    OR?: Prisma.DeviceWhereInput[];
    NOT?: Prisma.DeviceWhereInput | Prisma.DeviceWhereInput[];
    id?: Prisma.IntFilter<"Device"> | number;
    userId?: Prisma.IntFilter<"Device"> | number;
    userAgent?: Prisma.StringFilter<"Device"> | string;
    ip?: Prisma.StringFilter<"Device"> | string;
    isActive?: Prisma.BoolFilter<"Device"> | boolean;
    lastActive?: Prisma.DateTimeFilter<"Device"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Device"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
};
export type DeviceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    refreshTokens?: Prisma.RefreshTokenOrderByRelationAggregateInput;
};
export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.DeviceWhereInput | Prisma.DeviceWhereInput[];
    OR?: Prisma.DeviceWhereInput[];
    NOT?: Prisma.DeviceWhereInput | Prisma.DeviceWhereInput[];
    userId?: Prisma.IntFilter<"Device"> | number;
    userAgent?: Prisma.StringFilter<"Device"> | string;
    ip?: Prisma.StringFilter<"Device"> | string;
    isActive?: Prisma.BoolFilter<"Device"> | boolean;
    lastActive?: Prisma.DateTimeFilter<"Device"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Device"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
}, "id">;
export type DeviceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DeviceCountOrderByAggregateInput;
    _avg?: Prisma.DeviceAvgOrderByAggregateInput;
    _max?: Prisma.DeviceMaxOrderByAggregateInput;
    _min?: Prisma.DeviceMinOrderByAggregateInput;
    _sum?: Prisma.DeviceSumOrderByAggregateInput;
};
export type DeviceScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeviceScalarWhereWithAggregatesInput | Prisma.DeviceScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeviceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeviceScalarWhereWithAggregatesInput | Prisma.DeviceScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Device"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Device"> | number;
    userAgent?: Prisma.StringWithAggregatesFilter<"Device"> | string;
    ip?: Prisma.StringWithAggregatesFilter<"Device"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Device"> | boolean;
    lastActive?: Prisma.DateTimeWithAggregatesFilter<"Device"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Device"> | Date | string;
};
export type DeviceCreateInput = {
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDevicesInput;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutDeviceInput;
};
export type DeviceUncheckedCreateInput = {
    id?: number;
    userId: number;
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput;
};
export type DeviceUpdateInput = {
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDevicesNestedInput;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutDeviceNestedInput;
};
export type DeviceUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput;
};
export type DeviceCreateManyInput = {
    id?: number;
    userId: number;
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
};
export type DeviceUpdateManyMutationInput = {
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceListRelationFilter = {
    every?: Prisma.DeviceWhereInput;
    some?: Prisma.DeviceWhereInput;
    none?: Prisma.DeviceWhereInput;
};
export type DeviceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DeviceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeviceAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type DeviceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeviceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeviceSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type DeviceScalarRelationFilter = {
    is?: Prisma.DeviceWhereInput;
    isNot?: Prisma.DeviceWhereInput;
};
export type DeviceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput> | Prisma.DeviceCreateWithoutUserInput[] | Prisma.DeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutUserInput | Prisma.DeviceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeviceCreateManyUserInputEnvelope;
    connect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
};
export type DeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput> | Prisma.DeviceCreateWithoutUserInput[] | Prisma.DeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutUserInput | Prisma.DeviceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeviceCreateManyUserInputEnvelope;
    connect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
};
export type DeviceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput> | Prisma.DeviceCreateWithoutUserInput[] | Prisma.DeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutUserInput | Prisma.DeviceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput | Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeviceCreateManyUserInputEnvelope;
    set?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    disconnect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    delete?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    connect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    update?: Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput | Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeviceUpdateManyWithWhereWithoutUserInput | Prisma.DeviceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeviceScalarWhereInput | Prisma.DeviceScalarWhereInput[];
};
export type DeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput> | Prisma.DeviceCreateWithoutUserInput[] | Prisma.DeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutUserInput | Prisma.DeviceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput | Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeviceCreateManyUserInputEnvelope;
    set?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    disconnect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    delete?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    connect?: Prisma.DeviceWhereUniqueInput | Prisma.DeviceWhereUniqueInput[];
    update?: Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput | Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeviceUpdateManyWithWhereWithoutUserInput | Prisma.DeviceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeviceScalarWhereInput | Prisma.DeviceScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DeviceCreateNestedOneWithoutRefreshTokensInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutRefreshTokensInput, Prisma.DeviceUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutRefreshTokensInput;
    connect?: Prisma.DeviceWhereUniqueInput;
};
export type DeviceUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceCreateWithoutRefreshTokensInput, Prisma.DeviceUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.DeviceCreateOrConnectWithoutRefreshTokensInput;
    upsert?: Prisma.DeviceUpsertWithoutRefreshTokensInput;
    connect?: Prisma.DeviceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeviceUpdateToOneWithWhereWithoutRefreshTokensInput, Prisma.DeviceUpdateWithoutRefreshTokensInput>, Prisma.DeviceUncheckedUpdateWithoutRefreshTokensInput>;
};
export type DeviceCreateWithoutUserInput = {
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutDeviceInput;
};
export type DeviceUncheckedCreateWithoutUserInput = {
    id?: number;
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput;
};
export type DeviceCreateOrConnectWithoutUserInput = {
    where: Prisma.DeviceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput>;
};
export type DeviceCreateManyUserInputEnvelope = {
    data: Prisma.DeviceCreateManyUserInput | Prisma.DeviceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeviceWhereUniqueInput;
    update: Prisma.XOR<Prisma.DeviceUpdateWithoutUserInput, Prisma.DeviceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DeviceCreateWithoutUserInput, Prisma.DeviceUncheckedCreateWithoutUserInput>;
};
export type DeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeviceWhereUniqueInput;
    data: Prisma.XOR<Prisma.DeviceUpdateWithoutUserInput, Prisma.DeviceUncheckedUpdateWithoutUserInput>;
};
export type DeviceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DeviceScalarWhereInput;
    data: Prisma.XOR<Prisma.DeviceUpdateManyMutationInput, Prisma.DeviceUncheckedUpdateManyWithoutUserInput>;
};
export type DeviceScalarWhereInput = {
    AND?: Prisma.DeviceScalarWhereInput | Prisma.DeviceScalarWhereInput[];
    OR?: Prisma.DeviceScalarWhereInput[];
    NOT?: Prisma.DeviceScalarWhereInput | Prisma.DeviceScalarWhereInput[];
    id?: Prisma.IntFilter<"Device"> | number;
    userId?: Prisma.IntFilter<"Device"> | number;
    userAgent?: Prisma.StringFilter<"Device"> | string;
    ip?: Prisma.StringFilter<"Device"> | string;
    isActive?: Prisma.BoolFilter<"Device"> | boolean;
    lastActive?: Prisma.DateTimeFilter<"Device"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Device"> | Date | string;
};
export type DeviceCreateWithoutRefreshTokensInput = {
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDevicesInput;
};
export type DeviceUncheckedCreateWithoutRefreshTokensInput = {
    id?: number;
    userId: number;
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
};
export type DeviceCreateOrConnectWithoutRefreshTokensInput = {
    where: Prisma.DeviceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceCreateWithoutRefreshTokensInput, Prisma.DeviceUncheckedCreateWithoutRefreshTokensInput>;
};
export type DeviceUpsertWithoutRefreshTokensInput = {
    update: Prisma.XOR<Prisma.DeviceUpdateWithoutRefreshTokensInput, Prisma.DeviceUncheckedUpdateWithoutRefreshTokensInput>;
    create: Prisma.XOR<Prisma.DeviceCreateWithoutRefreshTokensInput, Prisma.DeviceUncheckedCreateWithoutRefreshTokensInput>;
    where?: Prisma.DeviceWhereInput;
};
export type DeviceUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: Prisma.DeviceWhereInput;
    data: Prisma.XOR<Prisma.DeviceUpdateWithoutRefreshTokensInput, Prisma.DeviceUncheckedUpdateWithoutRefreshTokensInput>;
};
export type DeviceUpdateWithoutRefreshTokensInput = {
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDevicesNestedInput;
};
export type DeviceUncheckedUpdateWithoutRefreshTokensInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceCreateManyUserInput = {
    id?: number;
    userAgent: string;
    ip: string;
    isActive?: boolean;
    lastActive?: Date | string;
    createdAt?: Date | string;
};
export type DeviceUpdateWithoutUserInput = {
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutDeviceNestedInput;
};
export type DeviceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput;
};
export type DeviceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userAgent?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastActive?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeviceCountOutputType = {
    refreshTokens: number;
};
export type DeviceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refreshTokens?: boolean | DeviceCountOutputTypeCountRefreshTokensArgs;
};
export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceCountOutputTypeSelect<ExtArgs> | null;
};
export type DeviceCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
};
export type DeviceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    userAgent?: boolean;
    ip?: boolean;
    isActive?: boolean;
    lastActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.Device$refreshTokensArgs<ExtArgs>;
    _count?: boolean | Prisma.DeviceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["device"]>;
export type DeviceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    userAgent?: boolean;
    ip?: boolean;
    isActive?: boolean;
    lastActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["device"]>;
export type DeviceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    userAgent?: boolean;
    ip?: boolean;
    isActive?: boolean;
    lastActive?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["device"]>;
export type DeviceSelectScalar = {
    id?: boolean;
    userId?: boolean;
    userAgent?: boolean;
    ip?: boolean;
    isActive?: boolean;
    lastActive?: boolean;
    createdAt?: boolean;
};
export type DeviceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "userAgent" | "ip" | "isActive" | "lastActive" | "createdAt", ExtArgs["result"]["device"]>;
export type DeviceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    refreshTokens?: boolean | Prisma.Device$refreshTokensArgs<ExtArgs>;
    _count?: boolean | Prisma.DeviceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DeviceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DevicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Device";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        userAgent: string;
        ip: string;
        isActive: boolean;
        lastActive: Date;
        createdAt: Date;
    }, ExtArgs["result"]["device"]>;
    composites: {};
};
export type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DevicePayload, S>;
export type DeviceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeviceCountAggregateInputType | true;
};
export interface DeviceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Device'];
        meta: {
            name: 'Device';
        };
    };
    findUnique<T extends DeviceFindUniqueArgs>(args: Prisma.SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeviceFindFirstArgs>(args?: Prisma.SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeviceFindManyArgs>(args?: Prisma.SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeviceCreateArgs>(args: Prisma.SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeviceCreateManyArgs>(args?: Prisma.SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeviceDeleteArgs>(args: Prisma.SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeviceUpdateArgs>(args: Prisma.SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeviceDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeviceUpdateManyArgs>(args: Prisma.SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeviceUpsertArgs>(args: Prisma.SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma.Prisma__DeviceClient<runtime.Types.Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeviceCountArgs>(args?: Prisma.Subset<T, DeviceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeviceCountAggregateOutputType> : number>;
    aggregate<T extends DeviceAggregateArgs>(args: Prisma.Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>;
    groupBy<T extends DeviceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeviceGroupByArgs['orderBy'];
    } : {
        orderBy?: DeviceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeviceFieldRefs;
}
export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    refreshTokens<T extends Prisma.Device$refreshTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Device$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeviceFieldRefs {
    readonly id: Prisma.FieldRef<"Device", 'Int'>;
    readonly userId: Prisma.FieldRef<"Device", 'Int'>;
    readonly userAgent: Prisma.FieldRef<"Device", 'String'>;
    readonly ip: Prisma.FieldRef<"Device", 'String'>;
    readonly isActive: Prisma.FieldRef<"Device", 'Boolean'>;
    readonly lastActive: Prisma.FieldRef<"Device", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Device", 'DateTime'>;
}
export type DeviceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where: Prisma.DeviceWhereUniqueInput;
};
export type DeviceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where: Prisma.DeviceWhereUniqueInput;
};
export type DeviceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithRelationInput | Prisma.DeviceOrderByWithRelationInput[];
    cursor?: Prisma.DeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceScalarFieldEnum | Prisma.DeviceScalarFieldEnum[];
};
export type DeviceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithRelationInput | Prisma.DeviceOrderByWithRelationInput[];
    cursor?: Prisma.DeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceScalarFieldEnum | Prisma.DeviceScalarFieldEnum[];
};
export type DeviceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where?: Prisma.DeviceWhereInput;
    orderBy?: Prisma.DeviceOrderByWithRelationInput | Prisma.DeviceOrderByWithRelationInput[];
    cursor?: Prisma.DeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceScalarFieldEnum | Prisma.DeviceScalarFieldEnum[];
};
export type DeviceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceCreateInput, Prisma.DeviceUncheckedCreateInput>;
};
export type DeviceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeviceCreateManyInput | Prisma.DeviceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeviceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    data: Prisma.DeviceCreateManyInput | Prisma.DeviceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DeviceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DeviceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceUpdateInput, Prisma.DeviceUncheckedUpdateInput>;
    where: Prisma.DeviceWhereUniqueInput;
};
export type DeviceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeviceUpdateManyMutationInput, Prisma.DeviceUncheckedUpdateManyInput>;
    where?: Prisma.DeviceWhereInput;
    limit?: number;
};
export type DeviceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceUpdateManyMutationInput, Prisma.DeviceUncheckedUpdateManyInput>;
    where?: Prisma.DeviceWhereInput;
    limit?: number;
    include?: Prisma.DeviceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DeviceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where: Prisma.DeviceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceCreateInput, Prisma.DeviceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeviceUpdateInput, Prisma.DeviceUncheckedUpdateInput>;
};
export type DeviceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
    where: Prisma.DeviceWhereUniqueInput;
};
export type DeviceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceWhereInput;
    limit?: number;
};
export type Device$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
export type DeviceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceSelect<ExtArgs> | null;
    omit?: Prisma.DeviceOmit<ExtArgs> | null;
    include?: Prisma.DeviceInclude<ExtArgs> | null;
};
export {};
