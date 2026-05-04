import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type VerificationCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$VerificationCodePayload>;
export type AggregateVerificationCode = {
    _count: VerificationCodeCountAggregateOutputType | null;
    _avg: VerificationCodeAvgAggregateOutputType | null;
    _sum: VerificationCodeSumAggregateOutputType | null;
    _min: VerificationCodeMinAggregateOutputType | null;
    _max: VerificationCodeMaxAggregateOutputType | null;
};
export type VerificationCodeAvgAggregateOutputType = {
    id: number | null;
};
export type VerificationCodeSumAggregateOutputType = {
    id: number | null;
};
export type VerificationCodeMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    code: string | null;
    type: $Enums.VerificationCodeType | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type VerificationCodeMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    code: string | null;
    type: $Enums.VerificationCodeType | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type VerificationCodeCountAggregateOutputType = {
    id: number;
    email: number;
    code: number;
    type: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type VerificationCodeAvgAggregateInputType = {
    id?: true;
};
export type VerificationCodeSumAggregateInputType = {
    id?: true;
};
export type VerificationCodeMinAggregateInputType = {
    id?: true;
    email?: true;
    code?: true;
    type?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type VerificationCodeMaxAggregateInputType = {
    id?: true;
    email?: true;
    code?: true;
    type?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type VerificationCodeCountAggregateInputType = {
    id?: true;
    email?: true;
    code?: true;
    type?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type VerificationCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VerificationCodeCountAggregateInputType;
    _avg?: VerificationCodeAvgAggregateInputType;
    _sum?: VerificationCodeSumAggregateInputType;
    _min?: VerificationCodeMinAggregateInputType;
    _max?: VerificationCodeMaxAggregateInputType;
};
export type GetVerificationCodeAggregateType<T extends VerificationCodeAggregateArgs> = {
    [P in keyof T & keyof AggregateVerificationCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVerificationCode[P]> : Prisma.GetScalarType<T[P], AggregateVerificationCode[P]>;
};
export type VerificationCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithAggregationInput | Prisma.VerificationCodeOrderByWithAggregationInput[];
    by: Prisma.VerificationCodeScalarFieldEnum[] | Prisma.VerificationCodeScalarFieldEnum;
    having?: Prisma.VerificationCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationCodeCountAggregateInputType | true;
    _avg?: VerificationCodeAvgAggregateInputType;
    _sum?: VerificationCodeSumAggregateInputType;
    _min?: VerificationCodeMinAggregateInputType;
    _max?: VerificationCodeMaxAggregateInputType;
};
export type VerificationCodeGroupByOutputType = {
    id: number;
    email: string;
    code: string;
    type: $Enums.VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
    _count: VerificationCodeCountAggregateOutputType | null;
    _avg: VerificationCodeAvgAggregateOutputType | null;
    _sum: VerificationCodeSumAggregateOutputType | null;
    _min: VerificationCodeMinAggregateOutputType | null;
    _max: VerificationCodeMaxAggregateOutputType | null;
};
type GetVerificationCodeGroupByPayload<T extends VerificationCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VerificationCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VerificationCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VerificationCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>;
}>>;
export type VerificationCodeWhereInput = {
    AND?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    OR?: Prisma.VerificationCodeWhereInput[];
    NOT?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    id?: Prisma.IntFilter<"VerificationCode"> | number;
    email?: Prisma.StringFilter<"VerificationCode"> | string;
    code?: Prisma.StringFilter<"VerificationCode"> | string;
    type?: Prisma.EnumVerificationCodeTypeFilter<"VerificationCode"> | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
};
export type VerificationCodeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email_type?: Prisma.VerificationCodeEmailTypeCompoundUniqueInput;
    AND?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    OR?: Prisma.VerificationCodeWhereInput[];
    NOT?: Prisma.VerificationCodeWhereInput | Prisma.VerificationCodeWhereInput[];
    email?: Prisma.StringFilter<"VerificationCode"> | string;
    code?: Prisma.StringFilter<"VerificationCode"> | string;
    type?: Prisma.EnumVerificationCodeTypeFilter<"VerificationCode"> | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"VerificationCode"> | Date | string;
}, "id" | "email_type">;
export type VerificationCodeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.VerificationCodeCountOrderByAggregateInput;
    _avg?: Prisma.VerificationCodeAvgOrderByAggregateInput;
    _max?: Prisma.VerificationCodeMaxOrderByAggregateInput;
    _min?: Prisma.VerificationCodeMinOrderByAggregateInput;
    _sum?: Prisma.VerificationCodeSumOrderByAggregateInput;
};
export type VerificationCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.VerificationCodeScalarWhereWithAggregatesInput | Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VerificationCodeScalarWhereWithAggregatesInput | Prisma.VerificationCodeScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"VerificationCode"> | number;
    email?: Prisma.StringWithAggregatesFilter<"VerificationCode"> | string;
    code?: Prisma.StringWithAggregatesFilter<"VerificationCode"> | string;
    type?: Prisma.EnumVerificationCodeTypeWithAggregatesFilter<"VerificationCode"> | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string;
};
export type VerificationCodeCreateInput = {
    email: string;
    code: string;
    type: $Enums.VerificationCodeType;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type VerificationCodeUncheckedCreateInput = {
    id?: number;
    email: string;
    code: string;
    type: $Enums.VerificationCodeType;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type VerificationCodeUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVerificationCodeTypeFieldUpdateOperationsInput | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVerificationCodeTypeFieldUpdateOperationsInput | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeCreateManyInput = {
    id?: number;
    email: string;
    code: string;
    type: $Enums.VerificationCodeType;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type VerificationCodeUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVerificationCodeTypeFieldUpdateOperationsInput | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVerificationCodeTypeFieldUpdateOperationsInput | $Enums.VerificationCodeType;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerificationCodeEmailTypeCompoundUniqueInput = {
    email: string;
    type: $Enums.VerificationCodeType;
};
export type VerificationCodeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type VerificationCodeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type VerificationCodeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type EnumVerificationCodeTypeFieldUpdateOperationsInput = {
    set?: $Enums.VerificationCodeType;
};
export type VerificationCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    code?: boolean;
    type?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    code?: boolean;
    type?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    code?: boolean;
    type?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["verificationCode"]>;
export type VerificationCodeSelectScalar = {
    id?: boolean;
    email?: boolean;
    code?: boolean;
    type?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type VerificationCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "code" | "type" | "expiresAt" | "createdAt", ExtArgs["result"]["verificationCode"]>;
export type $VerificationCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VerificationCode";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        code: string;
        type: $Enums.VerificationCodeType;
        expiresAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["verificationCode"]>;
    composites: {};
};
export type VerificationCodeGetPayload<S extends boolean | null | undefined | VerificationCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload, S>;
export type VerificationCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VerificationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VerificationCodeCountAggregateInputType | true;
};
export interface VerificationCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VerificationCode'];
        meta: {
            name: 'VerificationCode';
        };
    };
    findUnique<T extends VerificationCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, VerificationCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VerificationCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VerificationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VerificationCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VerificationCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VerificationCodeFindManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VerificationCodeCreateArgs>(args: Prisma.SelectSubset<T, VerificationCodeCreateArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VerificationCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VerificationCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VerificationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VerificationCodeDeleteArgs>(args: Prisma.SelectSubset<T, VerificationCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VerificationCodeUpdateArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VerificationCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, VerificationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VerificationCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VerificationCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VerificationCodeUpsertArgs>(args: Prisma.SelectSubset<T, VerificationCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__VerificationCodeClient<runtime.Types.Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VerificationCodeCountArgs>(args?: Prisma.Subset<T, VerificationCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VerificationCodeCountAggregateOutputType> : number>;
    aggregate<T extends VerificationCodeAggregateArgs>(args: Prisma.Subset<T, VerificationCodeAggregateArgs>): Prisma.PrismaPromise<GetVerificationCodeAggregateType<T>>;
    groupBy<T extends VerificationCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VerificationCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: VerificationCodeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VerificationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VerificationCodeFieldRefs;
}
export interface Prisma__VerificationCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VerificationCodeFieldRefs {
    readonly id: Prisma.FieldRef<"VerificationCode", 'Int'>;
    readonly email: Prisma.FieldRef<"VerificationCode", 'String'>;
    readonly code: Prisma.FieldRef<"VerificationCode", 'String'>;
    readonly type: Prisma.FieldRef<"VerificationCode", 'VerificationCodeType'>;
    readonly expiresAt: Prisma.FieldRef<"VerificationCode", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"VerificationCode", 'DateTime'>;
}
export type VerificationCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where?: Prisma.VerificationCodeWhereInput;
    orderBy?: Prisma.VerificationCodeOrderByWithRelationInput | Prisma.VerificationCodeOrderByWithRelationInput[];
    cursor?: Prisma.VerificationCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerificationCodeScalarFieldEnum | Prisma.VerificationCodeScalarFieldEnum[];
};
export type VerificationCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeCreateInput, Prisma.VerificationCodeUncheckedCreateInput>;
};
export type VerificationCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VerificationCodeCreateManyInput | Prisma.VerificationCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VerificationCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.VerificationCodeCreateManyInput | Prisma.VerificationCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VerificationCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateInput, Prisma.VerificationCodeUncheckedUpdateInput>;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VerificationCodeUpdateManyMutationInput, Prisma.VerificationCodeUncheckedUpdateManyInput>;
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
};
export type VerificationCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VerificationCodeUpdateManyMutationInput, Prisma.VerificationCodeUncheckedUpdateManyInput>;
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
};
export type VerificationCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerificationCodeCreateInput, Prisma.VerificationCodeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VerificationCodeUpdateInput, Prisma.VerificationCodeUncheckedUpdateInput>;
};
export type VerificationCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
    where: Prisma.VerificationCodeWhereUniqueInput;
};
export type VerificationCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerificationCodeWhereInput;
    limit?: number;
};
export type VerificationCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VerificationCodeSelect<ExtArgs> | null;
    omit?: Prisma.VerificationCodeOmit<ExtArgs> | null;
};
export {};
