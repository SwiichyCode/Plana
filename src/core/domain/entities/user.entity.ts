export class User {
  constructor(
    public readonly id: string,
    public readonly clerkUserId: string,
    public first_name: string | null,
    public last_name: string | null,
    public email: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.id = id;
    this.clerkUserId = clerkUserId;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type UserRole = 'admin' | 'member';
