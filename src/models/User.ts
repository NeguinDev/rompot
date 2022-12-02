export class User {
  public id: string = "";
  public name?: string;
  public phone?: string;
  public isAdmin?: boolean;
  public isOwner?: boolean;

  constructor(id: string, name?: string, phone?: string) {
    if (phone) this.phone = phone;
    if (name) this.name = name;

    this.setId(id);
  }

  /**
   * * Define o ID do usuário
   * @param id
   */
  public setId(id: string) {
    if (id.includes("@")) this.setPhone(id.split("@")[0]);
    this.id = id;
  }

  /**
   * * Define o nome do usuário
   * @param name
   */
  public setName(name: string) {
    this.name = name;
  }

  /**
   * * Definir número do usuário
   * @param phone
   */
  public setPhone(phone: string) {
    this.phone = phone;
  }

  /**
   * * Retorna o ID do usuário
   * @returns
   */
  public getId(): string {
    return this.id || "";
  }

  /**
   * * Retorna o nome do usuário
   * @returns
   */
  public getName(): string | undefined {
    return this.name;
  }

  /**
   * * Definir número do usuário
   * @returns
   */
  public getPhone(): string {
    return this.phone || "";
  }

  /**
   * * Define se o usuáio é admin da sala de bate-papo
   * @param admin
   */
  public setAdmin(admin: boolean) {
    this.isAdmin = admin;
  }

  /**
   * * Retorna se o usuário é admin da sala de bate-papo
   * @returns
   */
  public getAdmin(): boolean {
    return this.isAdmin || false;
  }

  /**
   * * Define se o usuáio é dono da sala de bate-papo
   * @param owner
   */
  public setLeader(owner: boolean) {
    this.isOwner = owner;
  }

  /**
   * * Retorna se o usuário é dono da sala de bate-papo
   * @returns
   */
  public getLeader(): boolean {
    return this.isOwner || false;
  }

  /**
   * * Verifica se o usuário tem permissão
   * @param userPermissions
   * @param commandPermissions
   * @param ignore
   * @returns
   */
  public checkPermissions(userPermissions: string[], commandPermissions: string[], ignore: string[] = []): boolean {
    if (commandPermissions.length <= 0) return true;

    commandPermissions = commandPermissions.filter((p: string) => {
      if (ignore.includes(p)) return true;
      return userPermissions.indexOf(p) > -1;
    });

    return commandPermissions.length <= 0;
  }
}
