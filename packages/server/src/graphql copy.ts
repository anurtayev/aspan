import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Entry = {
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
  type: Scalars['String'];
};

export type File = Entry & {
   __typename?: 'File';
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
  type: Scalars['String'];
  size: Scalars['Int'];
  thumbImage?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};

export type Folder = Entry & {
   __typename?: 'Folder';
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
  type: Scalars['String'];
  children?: Maybe<Array<Entry>>;
};

export type MetaData = {
   __typename?: 'MetaData';
  tags?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addTag?: Maybe<MetaData>;
  removeTag?: Maybe<MetaData>;
  addAttribute?: Maybe<MetaData>;
  removeAttribute?: Maybe<MetaData>;
};


export type MutationAddTagArgs = {
  id: Scalars['String'];
  tag: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['String'];
  tag: Scalars['String'];
};


export type MutationAddAttributeArgs = {
  id: Scalars['String'];
  attribute: Array<Scalars['String']>;
};


export type MutationRemoveAttributeArgs = {
  id: Scalars['String'];
  attributeKey: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  getRootFolderEntries?: Maybe<Array<Entry>>;
  getFolderEntries?: Maybe<Array<Entry>>;
};


export type QueryGetFolderEntriesArgs = {
  id: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Entry: ResolversTypes['Folder'] | ResolversTypes['File'],
  ID: ResolverTypeWrapper<Scalars['ID']>,
  MetaData: ResolverTypeWrapper<MetaData>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Folder: ResolverTypeWrapper<Folder>,
  File: ResolverTypeWrapper<File>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Entry: ResolversParentTypes['Folder'] | ResolversParentTypes['File'],
  ID: Scalars['ID'],
  MetaData: MetaData,
  String: Scalars['String'],
  Mutation: {},
  Boolean: Scalars['Boolean'],
  Folder: Folder,
  File: File,
  Int: Scalars['Int'],
};

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  __resolveType: TypeResolveFn<'Folder' | 'File', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  thumbImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  children?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = {
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>,
  attributes?: Resolver<Maybe<Array<Array<ResolversTypes['String']>>>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddTagArgs, 'id' | 'tag'>>,
  removeTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'id' | 'tag'>>,
  addAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddAttributeArgs, 'id' | 'attribute'>>,
  removeAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveAttributeArgs, 'id' | 'attributeKey'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRootFolderEntries?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType>,
  getFolderEntries?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType, RequireFields<QueryGetFolderEntriesArgs, 'id'>>,
};

export type Resolvers<ContextType = any> = {
  Entry?: EntryResolvers,
  File?: FileResolvers<ContextType>,
  Folder?: FolderResolvers<ContextType>,
  MetaData?: MetaDataResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
