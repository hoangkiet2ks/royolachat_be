import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AiRateLimitModel = runtime.Types.Result.DefaultSelection<Prisma.$AiRateLimitPayload>;
export type AggregateAiRateLimit = {
    _count: AiRateLimitCountAggregateOutputType | null;
    _avg: AiRateLimitAvgAggregateOutputType | null;
    _sum: AiRateLimitSumAggregateOutputType | null;
    _min: AiRateLimitMinAggregateOutputType | null;
    _max: AiRateLimitMaxAggregateOutputType | null;
};
export type AiRateLimitAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    requestCount: number | null;
};
export type AiRateLimitSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    requestCount: number | null;
};
export type AiRateLimitMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    requestCount: number | null;
    windowStart: Date | null;
    updatedAt: Date | null;
};
export type AiRateLimitMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    requestCount: number | null;
    windowStart: Date | null;
    updatedAt: Date | null;
};
export type AiRateLimitCountAggregateOutputType = {
    id: number;
    userId: number;
    requestCount: number;
    windowStart: number;
    updatedAt: number;
    _all: number;
};
export type AiRateLimitAvgAggregateInputType = {
    id?: true;
    userId?: true;
    requestCount?: true;
};
export type AiRateLimitSumAggregateInputType = {
    id?: true;
    userId?: true;
    requestCount?: true;
};
export type AiRateLimitMinAggregateInputType = {
    id?: true;
    userId?: true;
    requestCount?: true;
    windowStart?: true;
    updatedAt?: true;
};
export type AiRateLimitMaxAggregateInputType = {
    id?: true;
    userId?: true;
    requestCount?: true;
    windowStart?: true;
    updatedAt?: true;
};
export type AiRateLimitCountAggregateInputType = {
    id?: true;
    userId?: true;
    requestCount?: true;
    windowStart?: true;
    updatedAt?: true;
    _all?: true;
};
export type AiRateLimitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiRateLimitWhereInput;
    orderBy?: Prisma.AiRateLimitOrderByWithRelationInput | Prisma.AiRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.AiRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AiRateLimitCountAggregateInputType;
    _avg?: AiRateLimitAvgAggregateInputType;
    _sum?: AiRateLimitSumAggregateInputType;
    _min?: AiRateLimitMinAggregateInputType;
    _max?: AiRateLimitMaxAggregateInputType;
};
export type GetAiRateLimitAggregateType<T extends AiRateLimitAggregateArgs> = {
    [P in keyof T & keyof AggregateAiRateLimit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAiRateLimit[P]> : Prisma.GetScalarType<T[P], AggregateAiRateLimit[P]>;
};
export type AiRateLimitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiRateLimitWhereInput;
    orderBy?: Prisma.AiRateLimitOrderByWithAggregationInput | Prisma.AiRateLimitOrderByWithAggregationInput[];
    by: Prisma.AiRateLimitScalarFieldEnum[] | Prisma.AiRateLimitScalarFieldEnum;
    having?: Prisma.AiRateLimitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AiRateLimitCountAggregateInputType | true;
    _avg?: AiRateLimitAvgAggregateInputType;
    _sum?: AiRateLimitSumAggregateInputType;
    _min?: AiRateLimitMinAggregateInputType;
    _max?: AiRateLimitMaxAggregateInputType;
};
export type AiRateLimitGroupByOutputType = {
    id: number;
    userId: number;
    requestCount: number;
    windowStart: Date;
    updatedAt: Date;
    _count: AiRateLimitCountAggregateOutputType | null;
    _avg: AiRateLimitAvgAggregateOutputType | null;
    _sum: AiRateLimitSumAggregateOutputType | null;
    _min: AiRateLimitMinAggregateOutputType | null;
    _max: AiRateLimitMaxAggregateOutputType | null;
};
type GetAiRateLimitGroupByPayload<T extends AiRateLimitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AiRateLimitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AiRateLimitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AiRateLimitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AiRateLimitGroupByOutputType[P]>;
}>>;
export type AiRateLimitWhereInput = {
    AND?: Prisma.AiRateLimitWhereInput | Prisma.AiRateLimitWhereInput[];
    OR?: Prisma.AiRateLimitWhereInput[];
    NOT?: Prisma.AiRateLimitWhereInput | Prisma.AiRateLimitWhereInput[];
    id?: Prisma.IntFilter<"AiRateLimit"> | number;
    userId?: Prisma.IntFilter<"AiRateLimit"> | number;
    requestCount?: Prisma.IntFilter<"AiRateLimit"> | number;
    windowStart?: Prisma.DateTimeFilter<"AiRateLimit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AiRateLimit"> | Date | string;
};
export type AiRateLimitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AiRateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    AND?: Prisma.AiRateLimitWhereInput | Prisma.AiRateLimitWhereInput[];
    OR?: Prisma.AiRateLimitWhereInput[];
    NOT?: Prisma.AiRateLimitWhereInput | Prisma.AiRateLimitWhereInput[];
    requestCount?: Prisma.IntFilter<"AiRateLimit"> | number;
    windowStart?: Prisma.DateTimeFilter<"AiRateLimit"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AiRateLimit"> | Date | string;
}, "id" | "userId">;
export type AiRateLimitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AiRateLimitCountOrderByAggregateInput;
    _avg?: Prisma.AiRateLimitAvgOrderByAggregateInput;
    _max?: Prisma.AiRateLimitMaxOrderByAggregateInput;
    _min?: Prisma.AiRateLimitMinOrderByAggregateInput;
    _sum?: Prisma.AiRateLimitSumOrderByAggregateInput;
};
export type AiRateLimitScalarWhereWithAggregatesInput = {
    AND?: Prisma.AiRateLimitScalarWhereWithAggregatesInput | Prisma.AiRateLimitScalarWhereWithAggregatesInput[];
    OR?: Prisma.AiRateLimitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AiRateLimitScalarWhereWithAggregatesInput | Prisma.AiRateLimitScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"AiRateLimit"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"AiRateLimit"> | number;
    requestCount?: Prisma.IntWithAggregatesFilter<"AiRateLimit"> | number;
    windowStart?: Prisma.DateTimeWithAggregatesFilter<"AiRateLimit"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AiRateLimit"> | Date | string;
};
export type AiRateLimitCreateInput = {
    userId: number;
    requestCount?: number;
    windowStart?: Date | string;
    updatedAt?: Date | string;
};
export type AiRateLimitUncheckedCreateInput = {
    id?: number;
    userId: number;
    requestCount?: number;
    windowStart?: Date | string;
    updatedAt?: Date | string;
};
export type AiRateLimitUpdateInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestCount?: Prisma.IntFieldUpdateOperationsInput | number;
    windowStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiRateLimitUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestCount?: Prisma.IntFieldUpdateOperationsInput | number;
    windowStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiRateLimitCreateManyInput = {
    id?: number;
    userId: number;
    requestCount?: number;
    windowStart?: Date | string;
    updatedAt?: Date | string;
};
export type AiRateLimitUpdateManyMutationInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestCount?: Prisma.IntFieldUpdateOperationsInput | number;
    windowStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiRateLimitUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    requestCount?: Prisma.IntFieldUpdateOperationsInput | number;
    windowStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiRateLimitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AiRateLimitAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
};
export type AiRateLimitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AiRateLimitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
    windowStart?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AiRateLimitSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestCount?: Prisma.SortOrder;
};
export type AiRateLimitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    requestCount?: boolean;
    windowStart?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["aiRateLimit"]>;
export type AiRateLimitSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    requestCount?: boolean;
    windowStart?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["aiRateLimit"]>;
export type AiRateLimitSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    requestCount?: boolean;
    windowStart?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["aiRateLimit"]>;
export type AiRateLimitSelectScalar = {
    id?: boolean;
    userId?: boolean;
    requestCount?: boolean;
    windowStart?: boolean;
    updatedAt?: boolean;
};
export type AiRateLimitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "requestCount" | "windowStart" | "updatedAt", ExtArgs["result"]["aiRateLimit"]>;
export type $AiRateLimitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AiRateLimit";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        requestCount: number;
        windowStart: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["aiRateLimit"]>;
    composites: {};
};
export type AiRateLimitGetPayload<S extends boolean | null | undefined | AiRateLimitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload, S>;
export type AiRateLimitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AiRateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AiRateLimitCountAggregateInputType | true;
};
export interface AiRateLimitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AiRateLimit'];
        meta: {
            name: 'AiRateLimit';
        };
    };
    findUnique<T extends AiRateLimitFindUniqueArgs>(args: Prisma.SelectSubset<T, AiRateLimitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AiRateLimitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AiRateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AiRateLimitFindFirstArgs>(args?: Prisma.SelectSubset<T, AiRateLimitFindFirstArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AiRateLimitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AiRateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AiRateLimitFindManyArgs>(args?: Prisma.SelectSubset<T, AiRateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AiRateLimitCreateArgs>(args: Prisma.SelectSubset<T, AiRateLimitCreateArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AiRateLimitCreateManyArgs>(args?: Prisma.SelectSubset<T, AiRateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AiRateLimitCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AiRateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AiRateLimitDeleteArgs>(args: Prisma.SelectSubset<T, AiRateLimitDeleteArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AiRateLimitUpdateArgs>(args: Prisma.SelectSubset<T, AiRateLimitUpdateArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AiRateLimitDeleteManyArgs>(args?: Prisma.SelectSubset<T, AiRateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AiRateLimitUpdateManyArgs>(args: Prisma.SelectSubset<T, AiRateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AiRateLimitUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AiRateLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AiRateLimitUpsertArgs>(args: Prisma.SelectSubset<T, AiRateLimitUpsertArgs<ExtArgs>>): Prisma.Prisma__AiRateLimitClient<runtime.Types.Result.GetResult<Prisma.$AiRateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AiRateLimitCountArgs>(args?: Prisma.Subset<T, AiRateLimitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AiRateLimitCountAggregateOutputType> : number>;
    aggregate<T extends AiRateLimitAggregateArgs>(args: Prisma.Subset<T, AiRateLimitAggregateArgs>): Prisma.PrismaPromise<GetAiRateLimitAggregateType<T>>;
    groupBy<T extends AiRateLimitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AiRateLimitGroupByArgs['orderBy'];
    } : {
        orderBy?: AiRateLimitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AiRateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AiRateLimitFieldRefs;
}
export interface Prisma__AiRateLimitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AiRateLimitFieldRefs {
    readonly id: Prisma.FieldRef<"AiRateLimit", 'Int'>;
    readonly userId: Prisma.FieldRef<"AiRateLimit", 'Int'>;
    readonly requestCount: Prisma.FieldRef<"AiRateLimit", 'Int'>;
    readonly windowStart: Prisma.FieldRef<"AiRateLimit", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AiRateLimit", 'DateTime'>;
}
export type AiRateLimitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where: Prisma.AiRateLimitWhereUniqueInput;
};
export type AiRateLimitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where: Prisma.AiRateLimitWhereUniqueInput;
};
export type AiRateLimitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where?: Prisma.AiRateLimitWhereInput;
    orderBy?: Prisma.AiRateLimitOrderByWithRelationInput | Prisma.AiRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.AiRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiRateLimitScalarFieldEnum | Prisma.AiRateLimitScalarFieldEnum[];
};
export type AiRateLimitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where?: Prisma.AiRateLimitWhereInput;
    orderBy?: Prisma.AiRateLimitOrderByWithRelationInput | Prisma.AiRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.AiRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiRateLimitScalarFieldEnum | Prisma.AiRateLimitScalarFieldEnum[];
};
export type AiRateLimitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where?: Prisma.AiRateLimitWhereInput;
    orderBy?: Prisma.AiRateLimitOrderByWithRelationInput | Prisma.AiRateLimitOrderByWithRelationInput[];
    cursor?: Prisma.AiRateLimitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiRateLimitScalarFieldEnum | Prisma.AiRateLimitScalarFieldEnum[];
};
export type AiRateLimitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiRateLimitCreateInput, Prisma.AiRateLimitUncheckedCreateInput>;
};
export type AiRateLimitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AiRateLimitCreateManyInput | Prisma.AiRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AiRateLimitCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    data: Prisma.AiRateLimitCreateManyInput | Prisma.AiRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AiRateLimitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiRateLimitUpdateInput, Prisma.AiRateLimitUncheckedUpdateInput>;
    where: Prisma.AiRateLimitWhereUniqueInput;
};
export type AiRateLimitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AiRateLimitUpdateManyMutationInput, Prisma.AiRateLimitUncheckedUpdateManyInput>;
    where?: Prisma.AiRateLimitWhereInput;
    limit?: number;
};
export type AiRateLimitUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiRateLimitUpdateManyMutationInput, Prisma.AiRateLimitUncheckedUpdateManyInput>;
    where?: Prisma.AiRateLimitWhereInput;
    limit?: number;
};
export type AiRateLimitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where: Prisma.AiRateLimitWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiRateLimitCreateInput, Prisma.AiRateLimitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AiRateLimitUpdateInput, Prisma.AiRateLimitUncheckedUpdateInput>;
};
export type AiRateLimitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
    where: Prisma.AiRateLimitWhereUniqueInput;
};
export type AiRateLimitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiRateLimitWhereInput;
    limit?: number;
};
export type AiRateLimitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiRateLimitSelect<ExtArgs> | null;
    omit?: Prisma.AiRateLimitOmit<ExtArgs> | null;
};
export {};
