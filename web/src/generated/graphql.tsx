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

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
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

export type MeasuredVariableInput = {
  measuredvariable: Scalars['String'];
  measuredvariableletter: Scalars['String'];
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
  allDepartments: PaginatedDepartments;
  department?: Maybe<Department>;
  allInstrumentfunctions: PaginatedInstrumentfunction;
  instrumentfunction?: Maybe<InstrumentFunction>;
  allMeasuredvariables: PaginatedMeasuredvariable;
  measuredvariable?: Maybe<MeasuredVariable>;
  allUsers: Array<User>;
  me?: Maybe<User>;
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


export type QueryAllMeasuredvariablesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMeasuredvariableArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment: DepartmentResponse;
  updateDepartment?: Maybe<Department>;
  deleteDepartment: Scalars['Boolean'];
  createInstrumentfunction: InstrumentFunctionResponse;
  updateInstrumentfunction?: Maybe<InstrumentFunction>;
  deleteInstrumentfunction: Scalars['Boolean'];
  createMeasuredvariable: MeasuredVariableResponse;
  updateMeasuredvariable?: Maybe<MeasuredVariable>;
  deleteMeasuredvariable: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
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

export type DeleteDepartmentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDepartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDepartment'>
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
export const DeleteDepartmentDocument = gql`
    mutation DeleteDepartment($id: Int!) {
  deleteDepartment(id: $id)
}
    `;

export function useDeleteDepartmentMutation() {
  return Urql.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument);
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