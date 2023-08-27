interface BaseParams {
  lang: string;
}

interface ModePageParams extends BaseParams {
  mode: string;
}

export interface PageProps {
  params: BaseParams;
}

export interface ModePageProps {
  params: ModePageParams;
}
