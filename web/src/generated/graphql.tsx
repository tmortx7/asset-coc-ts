import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['Int'];
  sitename?: Maybe<Scalars['String']>;
  sitenumber: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  addresses: Array<Address>;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['Int'];
  pluscode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  site: Site;
  siteId: Scalars['Int'];
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['Int'];
  /** City department designation */
  department?: Maybe<Scalars['String']>;
  /** City department description */
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MeasuredVariable = {
  __typename?: 'MeasuredVariable';
  id: Scalars['Int'];
  measuredvariable?: Maybe<Scalars['String']>;
  measuredvariableletter?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
  createdDate: Scalars['String'];
  updatedDate: Scalars['String'];
  version: Scalars['Float'];
  instrumenttagprefixes: Array<InstrumentTagPrefix>;
};

export type InstrumentTagPrefix = {
  __typename?: 'InstrumentTagPrefix';
  id: Scalars['Int'];
  tagprefix: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  instrumentfunction: InstrumentFunction;
  instrumentfunctionId: Scalars['Int'];
  measuredvariable: MeasuredVariable;
  measuredvariableId: Scalars['Int'];
};

export type InstrumentFunction = {
  __typename?: 'InstrumentFunction';
  id: Scalars['Int'];
  instrumentfunction?: Maybe<Scalars['String']>;
  instrumentfunctionletter?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
  createdDate: Scalars['String'];
  updatedDate: Scalars['String'];
  version: Scalars['Float'];
  instrumenttagprefixes: Array<InstrumentTagPrefix>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  errors?: Maybe<Array<FieldError>>;
  address?: Maybe<Address>;
};

export type PaginatedAddresses = {
  __typename?: 'PaginatedAddresses';
  allAddresses: Array<Address>;
  hasMore: Scalars['Boolean'];
};

export type DepartmentResponse = {
  __typename?: 'DepartmentResponse';
  errors?: Maybe<Array<FieldError>>;
  department?: Maybe<Department>;
};

export type PaginatedDepartments = {
  __typename?: 'PaginatedDepartments';
  allDepartments: Array<Department>;
  hasMore: Scalars['Boolean'];
};

export type InstrumentFunctionResponse = {
  __typename?: 'InstrumentFunctionResponse';
  errors?: Maybe<Array<FieldError>>;
  instrumentfunction?: Maybe<InstrumentFunction>;
};

export type PaginatedInstrumentfunction = {
  __typename?: 'PaginatedInstrumentfunction';
  allInstrumentfunctions: Array<InstrumentFunction>;
  hasMore: Scalars['Boolean'];
};

export type InstrumentTagPrefixResponse = {
  __typename?: 'InstrumentTagPrefixResponse';
  errors?: Maybe<Array<FieldError>>;
  tagprefix?: Maybe<InstrumentTagPrefix>;
};

export type PaginatedInstrumentTagprefix = {
  __typename?: 'PaginatedInstrumentTagprefix';
  instrumentTagprefixes: Array<InstrumentTagPrefix>;
  hasMore: Scalars['Boolean'];
};

export type MeasuredVariableResponse = {
  __typename?: 'MeasuredVariableResponse';
  errors?: Maybe<Array<FieldError>>;
  measuredvariable?: Maybe<MeasuredVariable>;
};

export type PaginatedMeasuredvariable = {
  __typename?: 'PaginatedMeasuredvariable';
  allMeasuredvariables: Array<MeasuredVariable>;
  hasMore: Scalars['Boolean'];
};

export type SiteResponse = {
  __typename?: 'SiteResponse';
  errors?: Maybe<Array<FieldError>>;
  site?: Maybe<Site>;
};

export type PaginatedSites = {
  __typename?: 'PaginatedSites';
  allSites: Array<Site>;
  hasMore: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddressInput = {
  pluscode?: Maybe<Scalars['String']>;
  siteId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type DepartmentInput = {
  department: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type InstrumentFunctionInput = {
  instrumentfunction: Scalars['String'];
  instrumentfunctionletter: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type InstrumentTagPrefixInput = {
  tagprefix: Scalars['String'];
  instrumentfunctionId: Scalars['Int'];
  measuredvariableId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type MeasuredVariableInput = {
  measuredvariable: Scalars['String'];
  measuredvariableletter: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type SiteInput = {
  sitename: Scalars['String'];
  sitenumber: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allAddresses: PaginatedAddresses;
  address?: Maybe<Address>;
  oneAddress?: Maybe<Address>;
  allDepartments: PaginatedDepartments;
  department?: Maybe<Department>;
  allInstrumentfunctions: PaginatedInstrumentfunction;
  instrumentfunction?: Maybe<InstrumentFunction>;
  getAllInstrumentfunctions: Array<InstrumentFunction>;
  instrumentTagprefixes: PaginatedInstrumentTagprefix;
  allInstrumentTagprefixes: Array<InstrumentTagPrefix>;
  oneInstrumentTagprefix?: Maybe<InstrumentTagPrefix>;
  allMeasuredvariables: PaginatedMeasuredvariable;
  measuredvariable?: Maybe<MeasuredVariable>;
  getAllMeasuredvariables: Array<MeasuredVariable>;
  allSites: PaginatedSites;
  oneSite?: Maybe<Site>;
  allUsers: Array<User>;
  me?: Maybe<User>;
};


export type QueryAllAddressesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryAddressArgs = {
  id: Scalars['Int'];
};


export type QueryOneAddressArgs = {
  id: Scalars['Int'];
};


export type QueryAllDepartmentsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryDepartmentArgs = {
  id: Scalars['Int'];
};


export type QueryAllInstrumentfunctionsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryInstrumentfunctionArgs = {
  id: Scalars['Int'];
};


export type QueryInstrumentTagprefixesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryOneInstrumentTagprefixArgs = {
  id: Scalars['Int'];
};


export type QueryAllMeasuredvariablesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMeasuredvariableArgs = {
  id: Scalars['Int'];
};


export type QueryAllSitesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryOneSiteArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: AddressResponse;
  updateAddress?: Maybe<Address>;
  deleteAddress: Scalars['Boolean'];
  createDepartment: DepartmentResponse;
  updateDepartment?: Maybe<Department>;
  deleteDepartment: Scalars['Boolean'];
  createInstrumentfunction: InstrumentFunctionResponse;
  updateInstrumentfunction?: Maybe<InstrumentFunction>;
  deleteInstrumentfunction: Scalars['Boolean'];
  createInstrumentTagprefix: InstrumentTagPrefixResponse;
  updateInstrumenttagprefix?: Maybe<InstrumentTagPrefix>;
  deleteInstrumenttagprefix: Scalars['Boolean'];
  createMeasuredvariable: MeasuredVariableResponse;
  updateMeasuredvariable?: Maybe<MeasuredVariable>;
  deleteMeasuredvariable: Scalars['Boolean'];
  createSite: SiteResponse;
  updateSite?: Maybe<Site>;
  deleteSite: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationUpdateAddressArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  pluscode: Scalars['String'];
  siteId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int'];
};


export type MutationCreateDepartmentArgs = {
  input: DepartmentInput;
};


export type MutationUpdateDepartmentArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  department: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateInstrumentfunctionArgs = {
  input: InstrumentFunctionInput;
};


export type MutationUpdateInstrumentfunctionArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  instrumentfunctionletter: Scalars['String'];
  instrumentfunction: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteInstrumentfunctionArgs = {
  id: Scalars['Int'];
};


export type MutationCreateInstrumentTagprefixArgs = {
  input: InstrumentTagPrefixInput;
};


export type MutationUpdateInstrumenttagprefixArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  measuredvariableId: Scalars['Int'];
  instrumentfunctionId: Scalars['Int'];
  tagprefix: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteInstrumenttagprefixArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMeasuredvariableArgs = {
  input: MeasuredVariableInput;
};


export type MutationUpdateMeasuredvariableArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  measuredvariableletter: Scalars['String'];
  measuredvariable: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteMeasuredvariableArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSiteArgs = {
  input: SiteInput;
};


export type MutationUpdateSiteArgs = {
  note: Scalars['String'];
  description: Scalars['String'];
  sitenumber: Scalars['String'];
  sitename: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteSiteArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreateInstrumentTagprefixMutationVariables = Exact<{
  tagprefix: Scalars['String'];
  measuredvariableId: Scalars['Int'];
  instrumentfunctionId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type CreateInstrumentTagprefixMutation = (
  { __typename?: 'Mutation' }
  & { createInstrumentTagprefix: (
    { __typename?: 'InstrumentTagPrefixResponse' }
    & { tagprefix?: Maybe<(
      { __typename?: 'InstrumentTagPrefix' }
      & Pick<InstrumentTagPrefix, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateInstrumentfunctionMutationVariables = Exact<{
  instrumentfunction: Scalars['String'];
  instrumentfunctionletter: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type CreateInstrumentfunctionMutation = (
  { __typename?: 'Mutation' }
  & { createInstrumentfunction: (
    { __typename?: 'InstrumentFunctionResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, instrumentfunction?: Maybe<(
      { __typename?: 'InstrumentFunction' }
      & Pick<InstrumentFunction, 'id' | 'instrumentfunction' | 'instrumentfunctionletter' | 'description' | 'note'>
    )> }
  ) }
);

export type CreateMeasuredvariableMutationVariables = Exact<{
  measuredvariable: Scalars['String'];
  measuredvariableletter: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type CreateMeasuredvariableMutation = (
  { __typename?: 'Mutation' }
  & { createMeasuredvariable: (
    { __typename?: 'MeasuredVariableResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, measuredvariable?: Maybe<(
      { __typename?: 'MeasuredVariable' }
      & Pick<MeasuredVariable, 'id' | 'measuredvariable' | 'measuredvariableletter' | 'description' | 'note'>
    )> }
  ) }
);

export type CreateaddressMutationVariables = Exact<{
  siteId: Scalars['Int'];
  pluscode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type CreateaddressMutation = (
  { __typename?: 'Mutation' }
  & { createAddress: (
    { __typename?: 'AddressResponse' }
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'siteId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type Create_DepartmentMutationVariables = Exact<{
  department: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type Create_DepartmentMutation = (
  { __typename?: 'Mutation' }
  & { createDepartment: (
    { __typename?: 'DepartmentResponse' }
    & { department?: Maybe<(
      { __typename?: 'Department' }
      & Pick<Department, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type Create_SiteMutationVariables = Exact<{
  sitename: Scalars['String'];
  sitenumber: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
}>;


export type Create_SiteMutation = (
  { __typename?: 'Mutation' }
  & { createSite: (
    { __typename?: 'SiteResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteaddressMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteaddressMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAddress'>
);

export type DeleteDepartmentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDepartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDepartment'>
);

export type DeleteInstrumentTagprefixMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteInstrumentTagprefixMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteInstrumenttagprefix'>
);

export type DeleteInstrumentfunctionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteInstrumentfunctionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteInstrumentfunction'>
);

export type DeleteMeasuredvariableMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMeasuredvariableMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMeasuredvariable'>
);

export type DeleteSiteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSiteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSite'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type UpdateaddressMutationVariables = Exact<{
  id: Scalars['Int'];
  siteId: Scalars['Int'];
  pluscode: Scalars['String'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateaddressMutation = (
  { __typename?: 'Mutation' }
  & { updateAddress?: Maybe<(
    { __typename?: 'Address' }
    & Pick<Address, 'id'>
  )> }
);

export type UpdateDepartmentMutationVariables = Exact<{
  id: Scalars['Int'];
  department: Scalars['String'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateDepartmentMutation = (
  { __typename?: 'Mutation' }
  & { updateDepartment?: Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'department' | 'description' | 'note'>
  )> }
);

export type UpdateInstrumentFunctionMutationVariables = Exact<{
  id: Scalars['Int'];
  instrumentfunction: Scalars['String'];
  instrumentfunctionletter: Scalars['String'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateInstrumentFunctionMutation = (
  { __typename?: 'Mutation' }
  & { updateInstrumentfunction?: Maybe<(
    { __typename?: 'InstrumentFunction' }
    & Pick<InstrumentFunction, 'id' | 'instrumentfunction' | 'instrumentfunctionletter' | 'description' | 'note'>
  )> }
);

export type UpdateInstrumentTagprefixMutationVariables = Exact<{
  id: Scalars['Int'];
  tagprefix: Scalars['String'];
  instrumentfunctionId: Scalars['Int'];
  measuredvariableId: Scalars['Int'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateInstrumentTagprefixMutation = (
  { __typename?: 'Mutation' }
  & { updateInstrumenttagprefix?: Maybe<(
    { __typename?: 'InstrumentTagPrefix' }
    & Pick<InstrumentTagPrefix, 'id' | 'tagprefix' | 'instrumentfunctionId' | 'measuredvariableId' | 'description' | 'note'>
  )> }
);

export type UpdateMeasuredVariableMutationVariables = Exact<{
  id: Scalars['Int'];
  measuredvariable: Scalars['String'];
  measuredvariableletter: Scalars['String'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateMeasuredVariableMutation = (
  { __typename?: 'Mutation' }
  & { updateMeasuredvariable?: Maybe<(
    { __typename?: 'MeasuredVariable' }
    & Pick<MeasuredVariable, 'id' | 'measuredvariable' | 'measuredvariableletter' | 'description' | 'note'>
  )> }
);

export type UpdateSiteMutationVariables = Exact<{
  id: Scalars['Int'];
  sitename: Scalars['String'];
  sitenumber: Scalars['String'];
  description: Scalars['String'];
  note: Scalars['String'];
}>;


export type UpdateSiteMutation = (
  { __typename?: 'Mutation' }
  & { updateSite?: Maybe<(
    { __typename?: 'Site' }
    & Pick<Site, 'id' | 'sitename' | 'sitenumber' | 'description' | 'note'>
  )> }
);

export type AlladdressesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AlladdressesQuery = (
  { __typename?: 'Query' }
  & { allAddresses: (
    { __typename?: 'PaginatedAddresses' }
    & Pick<PaginatedAddresses, 'hasMore'>
    & { allAddresses: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'pluscode' | 'description' | 'note' | 'createdAt' | 'updatedAt'>
      & { site: (
        { __typename?: 'Site' }
        & Pick<Site, 'sitename'>
      ) }
    )> }
  ) }
);

export type AllinstrumenttagprefixesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllinstrumenttagprefixesQuery = (
  { __typename?: 'Query' }
  & { allInstrumentTagprefixes: Array<(
    { __typename?: 'InstrumentTagPrefix' }
    & Pick<InstrumentTagPrefix, 'id' | 'tagprefix' | 'description' | 'note'>
  )> }
);

export type AllSitesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AllSitesQuery = (
  { __typename?: 'Query' }
  & { allSites: (
    { __typename?: 'PaginatedSites' }
    & Pick<PaginatedSites, 'hasMore'>
    & { allSites: Array<(
      { __typename?: 'Site' }
      & Pick<Site, 'id' | 'createdAt' | 'updatedAt' | 'sitename' | 'sitenumber' | 'description' | 'note'>
    )> }
  ) }
);

export type InstrumentTagPrefixesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type InstrumentTagPrefixesQuery = (
  { __typename?: 'Query' }
  & { instrumentTagprefixes: (
    { __typename?: 'PaginatedInstrumentTagprefix' }
    & Pick<PaginatedInstrumentTagprefix, 'hasMore'>
    & { instrumentTagprefixes: Array<(
      { __typename?: 'InstrumentTagPrefix' }
      & Pick<InstrumentTagPrefix, 'id' | 'tagprefix' | 'createdAt' | 'updatedAt' | 'description' | 'note'>
      & { measuredvariable: (
        { __typename?: 'MeasuredVariable' }
        & Pick<MeasuredVariable, 'measuredvariableletter' | 'measuredvariable'>
      ), instrumentfunction: (
        { __typename?: 'InstrumentFunction' }
        & Pick<InstrumentFunction, 'instrumentfunctionletter' | 'instrumentfunction'>
      ) }
    )> }
  ) }
);

export type AllInstrumentfunctionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AllInstrumentfunctionsQuery = (
  { __typename?: 'Query' }
  & { allInstrumentfunctions: (
    { __typename?: 'PaginatedInstrumentfunction' }
    & Pick<PaginatedInstrumentfunction, 'hasMore'>
    & { allInstrumentfunctions: Array<(
      { __typename?: 'InstrumentFunction' }
      & Pick<InstrumentFunction, 'id' | 'createdDate' | 'updatedDate' | 'instrumentfunction' | 'instrumentfunctionletter' | 'description' | 'note'>
    )> }
  ) }
);

export type AllMeasuredvariablesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AllMeasuredvariablesQuery = (
  { __typename?: 'Query' }
  & { allMeasuredvariables: (
    { __typename?: 'PaginatedMeasuredvariable' }
    & Pick<PaginatedMeasuredvariable, 'hasMore'>
    & { allMeasuredvariables: Array<(
      { __typename?: 'MeasuredVariable' }
      & Pick<MeasuredVariable, 'id' | 'createdDate' | 'updatedDate' | 'measuredvariable' | 'measuredvariableletter' | 'description' | 'note'>
    )> }
  ) }
);

export type DepartmentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DepartmentQuery = (
  { __typename?: 'Query' }
  & { department?: Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'createdAt' | 'updatedAt' | 'department' | 'description' | 'note'>
  )> }
);

export type AllDepartmentsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type AllDepartmentsQuery = (
  { __typename?: 'Query' }
  & { allDepartments: (
    { __typename?: 'PaginatedDepartments' }
    & Pick<PaginatedDepartments, 'hasMore'>
    & { allDepartments: Array<(
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'createdAt' | 'updatedAt' | 'department' | 'description' | 'note'>
    )> }
  ) }
);

export type GetallinstrumentfunctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetallinstrumentfunctionsQuery = (
  { __typename?: 'Query' }
  & { getAllInstrumentfunctions: Array<(
    { __typename?: 'InstrumentFunction' }
    & Pick<InstrumentFunction, 'id' | 'instrumentfunction' | 'instrumentfunctionletter' | 'description' | 'note'>
  )> }
);

export type GetallmeasuredvariablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetallmeasuredvariablesQuery = (
  { __typename?: 'Query' }
  & { getAllMeasuredvariables: Array<(
    { __typename?: 'MeasuredVariable' }
    & Pick<MeasuredVariable, 'id' | 'measuredvariable' | 'measuredvariableletter' | 'description' | 'note'>
  )> }
);

export type GetAllSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSitesQuery = (
  { __typename?: 'Query' }
  & { allSites: (
    { __typename?: 'PaginatedSites' }
    & Pick<PaginatedSites, 'hasMore'>
    & { allSites: Array<(
      { __typename?: 'Site' }
      & Pick<Site, 'id' | 'createdAt' | 'updatedAt' | 'sitename' | 'sitenumber' | 'description' | 'note'>
    )> }
  ) }
);

export type InstrumentfunctionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InstrumentfunctionQuery = (
  { __typename?: 'Query' }
  & { instrumentfunction?: Maybe<(
    { __typename?: 'InstrumentFunction' }
    & Pick<InstrumentFunction, 'id' | 'createdDate' | 'updatedDate' | 'instrumentfunction' | 'instrumentfunctionletter' | 'description' | 'note'>
  )> }
);

export type MeasuredvariableQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MeasuredvariableQuery = (
  { __typename?: 'Query' }
  & { measuredvariable?: Maybe<(
    { __typename?: 'MeasuredVariable' }
    & Pick<MeasuredVariable, 'id' | 'createdDate' | 'updatedDate' | 'measuredvariable' | 'measuredvariableletter' | 'description' | 'note'>
  )> }
);

export type OneaddressQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OneaddressQuery = (
  { __typename?: 'Query' }
  & { oneAddress?: Maybe<(
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'siteId' | 'pluscode' | 'description' | 'note'>
  )> }
);

export type OneinstrumenttagprefixQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OneinstrumenttagprefixQuery = (
  { __typename?: 'Query' }
  & { oneInstrumentTagprefix?: Maybe<(
    { __typename?: 'InstrumentTagPrefix' }
    & Pick<InstrumentTagPrefix, 'id' | 'tagprefix' | 'instrumentfunctionId' | 'measuredvariableId' | 'description' | 'note'>
    & { measuredvariable: (
      { __typename?: 'MeasuredVariable' }
      & Pick<MeasuredVariable, 'measuredvariableletter' | 'measuredvariable'>
    ), instrumentfunction: (
      { __typename?: 'InstrumentFunction' }
      & Pick<InstrumentFunction, 'instrumentfunctionletter' | 'instrumentfunction'>
    ) }
  )> }
);

export type OnesiteQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OnesiteQuery = (
  { __typename?: 'Query' }
  & { oneSite?: Maybe<(
    { __typename?: 'Site' }
    & Pick<Site, 'id' | 'createdAt' | 'updatedAt' | 'sitename' | 'sitenumber' | 'description' | 'note'>
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateInstrumentTagprefixDocument = gql`
    mutation CreateInstrumentTagprefix($tagprefix: String!, $measuredvariableId: Int!, $instrumentfunctionId: Int!, $description: String, $note: String) {
  createInstrumentTagprefix(
    input: {tagprefix: $tagprefix, measuredvariableId: $measuredvariableId, instrumentfunctionId: $instrumentfunctionId, description: $description, note: $note}
  ) {
    tagprefix {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateInstrumentTagprefixMutation() {
  return Urql.useMutation<CreateInstrumentTagprefixMutation, CreateInstrumentTagprefixMutationVariables>(CreateInstrumentTagprefixDocument);
};
export const CreateInstrumentfunctionDocument = gql`
    mutation CreateInstrumentfunction($instrumentfunction: String!, $instrumentfunctionletter: String!, $description: String, $note: String) {
  createInstrumentfunction(
    input: {instrumentfunction: $instrumentfunction, instrumentfunctionletter: $instrumentfunctionletter, description: $description, note: $note}
  ) {
    errors {
      field
      message
    }
    instrumentfunction {
      id
      instrumentfunction
      instrumentfunctionletter
      description
      note
    }
  }
}
    `;

export function useCreateInstrumentfunctionMutation() {
  return Urql.useMutation<CreateInstrumentfunctionMutation, CreateInstrumentfunctionMutationVariables>(CreateInstrumentfunctionDocument);
};
export const CreateMeasuredvariableDocument = gql`
    mutation CreateMeasuredvariable($measuredvariable: String!, $measuredvariableletter: String!, $description: String, $note: String) {
  createMeasuredvariable(
    input: {measuredvariable: $measuredvariable, measuredvariableletter: $measuredvariableletter, description: $description, note: $note}
  ) {
    errors {
      field
      message
    }
    measuredvariable {
      id
      measuredvariable
      measuredvariableletter
      description
      note
    }
  }
}
    `;

export function useCreateMeasuredvariableMutation() {
  return Urql.useMutation<CreateMeasuredvariableMutation, CreateMeasuredvariableMutationVariables>(CreateMeasuredvariableDocument);
};
export const CreateaddressDocument = gql`
    mutation CREATEADDRESS($siteId: Int!, $pluscode: String, $description: String, $note: String) {
  createAddress(
    input: {siteId: $siteId, pluscode: $pluscode, description: $description, note: $note}
  ) {
    address {
      id
      siteId
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateaddressMutation() {
  return Urql.useMutation<CreateaddressMutation, CreateaddressMutationVariables>(CreateaddressDocument);
};
export const Create_DepartmentDocument = gql`
    mutation CREATE_DEPARTMENT($department: String!, $description: String, $note: String) {
  createDepartment(
    input: {department: $department, note: $note, description: $description}
  ) {
    department {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreate_DepartmentMutation() {
  return Urql.useMutation<Create_DepartmentMutation, Create_DepartmentMutationVariables>(Create_DepartmentDocument);
};
export const Create_SiteDocument = gql`
    mutation CREATE_SITE($sitename: String!, $sitenumber: String!, $description: String, $note: String) {
  createSite(
    input: {sitename: $sitename, sitenumber: $sitenumber, note: $note, description: $description}
  ) {
    errors {
      field
      message
    }
  }
}
    `;

export function useCreate_SiteMutation() {
  return Urql.useMutation<Create_SiteMutation, Create_SiteMutationVariables>(Create_SiteDocument);
};
export const DeleteaddressDocument = gql`
    mutation DELETEADDRESS($id: Int!) {
  deleteAddress(id: $id)
}
    `;

export function useDeleteaddressMutation() {
  return Urql.useMutation<DeleteaddressMutation, DeleteaddressMutationVariables>(DeleteaddressDocument);
};
export const DeleteDepartmentDocument = gql`
    mutation DeleteDepartment($id: Int!) {
  deleteDepartment(id: $id)
}
    `;

export function useDeleteDepartmentMutation() {
  return Urql.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument);
};
export const DeleteInstrumentTagprefixDocument = gql`
    mutation DeleteInstrumentTagprefix($id: Int!) {
  deleteInstrumenttagprefix(id: $id)
}
    `;

export function useDeleteInstrumentTagprefixMutation() {
  return Urql.useMutation<DeleteInstrumentTagprefixMutation, DeleteInstrumentTagprefixMutationVariables>(DeleteInstrumentTagprefixDocument);
};
export const DeleteInstrumentfunctionDocument = gql`
    mutation DeleteInstrumentfunction($id: Int!) {
  deleteInstrumentfunction(id: $id)
}
    `;

export function useDeleteInstrumentfunctionMutation() {
  return Urql.useMutation<DeleteInstrumentfunctionMutation, DeleteInstrumentfunctionMutationVariables>(DeleteInstrumentfunctionDocument);
};
export const DeleteMeasuredvariableDocument = gql`
    mutation DeleteMeasuredvariable($id: Int!) {
  deleteMeasuredvariable(id: $id)
}
    `;

export function useDeleteMeasuredvariableMutation() {
  return Urql.useMutation<DeleteMeasuredvariableMutation, DeleteMeasuredvariableMutationVariables>(DeleteMeasuredvariableDocument);
};
export const DeleteSiteDocument = gql`
    mutation DeleteSite($id: Int!) {
  deleteSite(id: $id)
}
    `;

export function useDeleteSiteMutation() {
  return Urql.useMutation<DeleteSiteMutation, DeleteSiteMutationVariables>(DeleteSiteDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateaddressDocument = gql`
    mutation UPDATEADDRESS($id: Int!, $siteId: Int!, $pluscode: String!, $description: String!, $note: String!) {
  updateAddress(
    id: $id
    siteId: $siteId
    pluscode: $pluscode
    description: $description
    note: $note
  ) {
    id
  }
}
    `;

export function useUpdateaddressMutation() {
  return Urql.useMutation<UpdateaddressMutation, UpdateaddressMutationVariables>(UpdateaddressDocument);
};
export const UpdateDepartmentDocument = gql`
    mutation UpdateDepartment($id: Int!, $department: String!, $description: String!, $note: String!) {
  updateDepartment(
    id: $id
    department: $department
    description: $description
    note: $note
  ) {
    id
    department
    description
    note
  }
}
    `;

export function useUpdateDepartmentMutation() {
  return Urql.useMutation<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>(UpdateDepartmentDocument);
};
export const UpdateInstrumentFunctionDocument = gql`
    mutation UpdateInstrumentFunction($id: Int!, $instrumentfunction: String!, $instrumentfunctionletter: String!, $description: String!, $note: String!) {
  updateInstrumentfunction(
    id: $id
    instrumentfunction: $instrumentfunction
    instrumentfunctionletter: $instrumentfunctionletter
    description: $description
    note: $note
  ) {
    id
    instrumentfunction
    instrumentfunctionletter
    description
    note
  }
}
    `;

export function useUpdateInstrumentFunctionMutation() {
  return Urql.useMutation<UpdateInstrumentFunctionMutation, UpdateInstrumentFunctionMutationVariables>(UpdateInstrumentFunctionDocument);
};
export const UpdateInstrumentTagprefixDocument = gql`
    mutation UpdateInstrumentTagprefix($id: Int!, $tagprefix: String!, $instrumentfunctionId: Int!, $measuredvariableId: Int!, $description: String!, $note: String!) {
  updateInstrumenttagprefix(
    id: $id
    tagprefix: $tagprefix
    instrumentfunctionId: $instrumentfunctionId
    measuredvariableId: $measuredvariableId
    description: $description
    note: $note
  ) {
    id
    tagprefix
    instrumentfunctionId
    measuredvariableId
    description
    note
  }
}
    `;

export function useUpdateInstrumentTagprefixMutation() {
  return Urql.useMutation<UpdateInstrumentTagprefixMutation, UpdateInstrumentTagprefixMutationVariables>(UpdateInstrumentTagprefixDocument);
};
export const UpdateMeasuredVariableDocument = gql`
    mutation UpdateMeasuredVariable($id: Int!, $measuredvariable: String!, $measuredvariableletter: String!, $description: String!, $note: String!) {
  updateMeasuredvariable(
    id: $id
    measuredvariable: $measuredvariable
    measuredvariableletter: $measuredvariableletter
    description: $description
    note: $note
  ) {
    id
    measuredvariable
    measuredvariableletter
    description
    note
  }
}
    `;

export function useUpdateMeasuredVariableMutation() {
  return Urql.useMutation<UpdateMeasuredVariableMutation, UpdateMeasuredVariableMutationVariables>(UpdateMeasuredVariableDocument);
};
export const UpdateSiteDocument = gql`
    mutation UpdateSite($id: Int!, $sitename: String!, $sitenumber: String!, $description: String!, $note: String!) {
  updateSite(
    id: $id
    sitename: $sitename
    sitenumber: $sitenumber
    description: $description
    note: $note
  ) {
    id
    sitename
    sitenumber
    description
    note
  }
}
    `;

export function useUpdateSiteMutation() {
  return Urql.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument);
};
export const AlladdressesDocument = gql`
    query ALLADDRESSES($limit: Int!, $cursor: String) {
  allAddresses(limit: $limit, cursor: $cursor) {
    hasMore
    allAddresses {
      id
      pluscode
      description
      note
      createdAt
      updatedAt
      site {
        sitename
      }
    }
  }
}
    `;

export function useAlladdressesQuery(options: Omit<Urql.UseQueryArgs<AlladdressesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AlladdressesQuery>({ query: AlladdressesDocument, ...options });
};
export const AllinstrumenttagprefixesDocument = gql`
    query ALLINSTRUMENTTAGPREFIXES {
  allInstrumentTagprefixes {
    id
    tagprefix
    description
    note
  }
}
    `;

export function useAllinstrumenttagprefixesQuery(options: Omit<Urql.UseQueryArgs<AllinstrumenttagprefixesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllinstrumenttagprefixesQuery>({ query: AllinstrumenttagprefixesDocument, ...options });
};
export const AllSitesDocument = gql`
    query AllSites($limit: Int!, $cursor: String) {
  allSites(limit: $limit, cursor: $cursor) {
    hasMore
    allSites {
      id
      createdAt
      updatedAt
      sitename
      sitenumber
      description
      note
    }
  }
}
    `;

export function useAllSitesQuery(options: Omit<Urql.UseQueryArgs<AllSitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllSitesQuery>({ query: AllSitesDocument, ...options });
};
export const InstrumentTagPrefixesDocument = gql`
    query InstrumentTagPrefixes($limit: Int!, $cursor: String) {
  instrumentTagprefixes(limit: $limit, cursor: $cursor) {
    hasMore
    instrumentTagprefixes {
      id
      tagprefix
      measuredvariable {
        measuredvariableletter
        measuredvariable
      }
      instrumentfunction {
        instrumentfunctionletter
        instrumentfunction
      }
      createdAt
      updatedAt
      description
      note
    }
  }
}
    `;

export function useInstrumentTagPrefixesQuery(options: Omit<Urql.UseQueryArgs<InstrumentTagPrefixesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InstrumentTagPrefixesQuery>({ query: InstrumentTagPrefixesDocument, ...options });
};
export const AllInstrumentfunctionsDocument = gql`
    query AllInstrumentfunctions($limit: Int!, $cursor: String) {
  allInstrumentfunctions(limit: $limit, cursor: $cursor) {
    hasMore
    allInstrumentfunctions {
      id
      createdDate
      updatedDate
      instrumentfunction
      instrumentfunctionletter
      description
      note
    }
  }
}
    `;

export function useAllInstrumentfunctionsQuery(options: Omit<Urql.UseQueryArgs<AllInstrumentfunctionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllInstrumentfunctionsQuery>({ query: AllInstrumentfunctionsDocument, ...options });
};
export const AllMeasuredvariablesDocument = gql`
    query AllMeasuredvariables($limit: Int!, $cursor: String) {
  allMeasuredvariables(limit: $limit, cursor: $cursor) {
    hasMore
    allMeasuredvariables {
      id
      createdDate
      updatedDate
      measuredvariable
      measuredvariableletter
      description
      note
    }
  }
}
    `;

export function useAllMeasuredvariablesQuery(options: Omit<Urql.UseQueryArgs<AllMeasuredvariablesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllMeasuredvariablesQuery>({ query: AllMeasuredvariablesDocument, ...options });
};
export const DepartmentDocument = gql`
    query Department($id: Int!) {
  department(id: $id) {
    id
    createdAt
    updatedAt
    department
    description
    note
  }
}
    `;

export function useDepartmentQuery(options: Omit<Urql.UseQueryArgs<DepartmentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DepartmentQuery>({ query: DepartmentDocument, ...options });
};
export const AllDepartmentsDocument = gql`
    query AllDepartments($limit: Int!, $cursor: String) {
  allDepartments(limit: $limit, cursor: $cursor) {
    hasMore
    allDepartments {
      id
      createdAt
      updatedAt
      department
      description
      note
    }
  }
}
    `;

export function useAllDepartmentsQuery(options: Omit<Urql.UseQueryArgs<AllDepartmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllDepartmentsQuery>({ query: AllDepartmentsDocument, ...options });
};
export const GetallinstrumentfunctionsDocument = gql`
    query GETALLINSTRUMENTFUNCTIONS {
  getAllInstrumentfunctions {
    id
    instrumentfunction
    instrumentfunctionletter
    description
    note
  }
}
    `;

export function useGetallinstrumentfunctionsQuery(options: Omit<Urql.UseQueryArgs<GetallinstrumentfunctionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetallinstrumentfunctionsQuery>({ query: GetallinstrumentfunctionsDocument, ...options });
};
export const GetallmeasuredvariablesDocument = gql`
    query GETALLMEASUREDVARIABLES {
  getAllMeasuredvariables {
    id
    measuredvariable
    measuredvariableletter
    description
    note
  }
}
    `;

export function useGetallmeasuredvariablesQuery(options: Omit<Urql.UseQueryArgs<GetallmeasuredvariablesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetallmeasuredvariablesQuery>({ query: GetallmeasuredvariablesDocument, ...options });
};
export const GetAllSitesDocument = gql`
    query GETAllSITES {
  allSites(limit: 500) {
    hasMore
    allSites {
      id
      createdAt
      updatedAt
      sitename
      sitenumber
      description
      note
    }
  }
}
    `;

export function useGetAllSitesQuery(options: Omit<Urql.UseQueryArgs<GetAllSitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllSitesQuery>({ query: GetAllSitesDocument, ...options });
};
export const InstrumentfunctionDocument = gql`
    query Instrumentfunction($id: Int!) {
  instrumentfunction(id: $id) {
    id
    createdDate
    updatedDate
    instrumentfunction
    instrumentfunctionletter
    description
    note
  }
}
    `;

export function useInstrumentfunctionQuery(options: Omit<Urql.UseQueryArgs<InstrumentfunctionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InstrumentfunctionQuery>({ query: InstrumentfunctionDocument, ...options });
};
export const MeasuredvariableDocument = gql`
    query Measuredvariable($id: Int!) {
  measuredvariable(id: $id) {
    id
    createdDate
    updatedDate
    measuredvariable
    measuredvariableletter
    description
    note
  }
}
    `;

export function useMeasuredvariableQuery(options: Omit<Urql.UseQueryArgs<MeasuredvariableQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeasuredvariableQuery>({ query: MeasuredvariableDocument, ...options });
};
export const OneaddressDocument = gql`
    query ONEADDRESS($id: Int!) {
  oneAddress(id: $id) {
    id
    siteId
    pluscode
    description
    note
  }
}
    `;

export function useOneaddressQuery(options: Omit<Urql.UseQueryArgs<OneaddressQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OneaddressQuery>({ query: OneaddressDocument, ...options });
};
export const OneinstrumenttagprefixDocument = gql`
    query ONEINSTRUMENTTAGPREFIX($id: Int!) {
  oneInstrumentTagprefix(id: $id) {
    id
    tagprefix
    instrumentfunctionId
    measuredvariableId
    description
    note
    measuredvariable {
      measuredvariableletter
      measuredvariable
    }
    instrumentfunction {
      instrumentfunctionletter
      instrumentfunction
    }
  }
}
    `;

export function useOneinstrumenttagprefixQuery(options: Omit<Urql.UseQueryArgs<OneinstrumenttagprefixQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OneinstrumenttagprefixQuery>({ query: OneinstrumenttagprefixDocument, ...options });
};
export const OnesiteDocument = gql`
    query ONESITE($id: Int!) {
  oneSite(id: $id) {
    id
    createdAt
    updatedAt
    sitename
    sitenumber
    description
    note
  }
}
    `;

export function useOnesiteQuery(options: Omit<Urql.UseQueryArgs<OnesiteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OnesiteQuery>({ query: OnesiteDocument, ...options });
};