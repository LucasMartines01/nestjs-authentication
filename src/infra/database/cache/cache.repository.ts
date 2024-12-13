export default interface ICacheRepository {
  get(key: string): Promise<string>;
  set(key: string, value: string): Promise<void>;
  del(key: string): Promise<void>;
}
