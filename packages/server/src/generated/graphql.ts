import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  name: Scalars['String'];
};

export type File = Entry & {
  __typename?: 'File';
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
  name: Scalars['String'];
  size: Scalars['Int'];
  thumbImageUrl: Scalars['String'];
  imageUrl: Scalars['String'];
  contentType: Scalars['String'];
};

export type Folder = Entry & {
  __typename?: 'Folder';
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
  name: Scalars['String'];
  children?: Maybe<Array<Entry>>;
};

export type FolderElement = File | Folder;

export type MetaData = {
  __typename?: 'MetaData';
  tags?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type MetaDataInput = {
  tags?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Adds new tag to a folder entry. If element does
   * exist it returns updated metadata object or null
   * otherwise.
   */
  addTag?: Maybe<MetaData>;
  removeTag?: Maybe<MetaData>;
  addAttribute?: Maybe<MetaData>;
  removeAttribute?: Maybe<MetaData>;
  setTitle?: Maybe<MetaData>;
  setDescription?: Maybe<MetaData>;
  setMetaData?: Maybe<MetaData>;
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


export type MutationSetTitleArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};


export type MutationSetDescriptionArgs = {
  id: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSetMetaDataArgs = {
  id: Scalars['String'];
  metaData: MetaDataInput;
};

export type Query = {
  __typename?: 'Query';
  getFolderEntries?: Maybe<Array<FolderElement>>;
  getFavorites?: Maybe<Array<FolderElement>>;
  getEntry?: Maybe<FolderElement>;
};


export type QueryGetFolderEntriesArgs = {
  id: Scalars['String'];
};


export type QueryGetEntryArgs = {
  id: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FolderElement: ResolversTypes['File'] | ResolversTypes['Folder'];
  File: ResolverTypeWrapper<File>;
  Entry: ResolversTypes['File'] | ResolversTypes['Folder'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  MetaData: ResolverTypeWrapper<MetaData>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Folder: ResolverTypeWrapper<Folder>;
  Mutation: ResolverTypeWrapper<{}>;
  MetaDataInput: MetaDataInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  FolderElement: ResolversParentTypes['File'] | ResolversParentTypes['Folder'];
  File: File;
  Entry: ResolversParentTypes['File'] | ResolversParentTypes['Folder'];
  ID: Scalars['ID'];
  MetaData: MetaData;
  Int: Scalars['Int'];
  Folder: Folder;
  Mutation: {};
  MetaDataInput: MetaDataInput;
  Boolean: Scalars['Boolean'];
}>;

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = ResolversObject<{
  __resolveType: TypeResolveFn<'File' | 'Folder', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thumbImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  children?: Resolver<Maybe<Array<ResolversTypes['Entry']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FolderElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderElement'] = ResolversParentTypes['FolderElement']> = ResolversObject<{
  __resolveType: TypeResolveFn<'File' | 'Folder', ParentType, ContextType>;
}>;

export type MetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = ResolversObject<{
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<Array<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddTagArgs, 'id' | 'tag'>>;
  removeTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'id' | 'tag'>>;
  addAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddAttributeArgs, 'id' | 'attribute'>>;
  removeAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveAttributeArgs, 'id' | 'attributeKey'>>;
  setTitle?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetTitleArgs, 'id' | 'title'>>;
  setDescription?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetDescriptionArgs, 'id' | 'description'>>;
  setMetaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetMetaDataArgs, 'id' | 'metaData'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getFolderEntries?: Resolver<Maybe<Array<ResolversTypes['FolderElement']>>, ParentType, ContextType, RequireFields<QueryGetFolderEntriesArgs, 'id'>>;
  getFavorites?: Resolver<Maybe<Array<ResolversTypes['FolderElement']>>, ParentType, ContextType>;
  getEntry?: Resolver<Maybe<ResolversTypes['FolderElement']>, ParentType, ContextType, RequireFields<QueryGetEntryArgs, 'id'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Entry?: EntryResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  FolderElement?: FolderElementResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
