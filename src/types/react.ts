export interface DefaultFCProps {
  children?: React.ReactNode;
  className?: string;
}
export type FCProps<T = unknown> = Partial<DefaultFCProps> & T;
export type ExtendedFC<T = unknown> = React.FC<FCProps<T>>;

export type TLayout = React.FC<Readonly<Pick<DefaultFCProps, "children">>>;
interface PageProps {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
export type TPage = React.FC<Readonly<PageProps>>;
