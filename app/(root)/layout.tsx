import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

type Props = React.PropsWithChildren<{}>;

export default function RootLayout({ children }: Props) {
    return (
        <SidebarWrapper>
            {children}
        </SidebarWrapper>
    );
}
