export class ProjectMemberEntity {
  constructor(
    public readonly id: string,
    public userId: string,
    public projectId: string,
    public role: string,
    public attributes: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.projectId = projectId;
    this.role = role;
    this.attributes = attributes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
