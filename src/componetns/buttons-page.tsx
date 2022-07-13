import {PropsWithChildren} from "react";

export const ButtonsPage = (props: PropsWithChildren) => {
    return (
        <div style={{float: "right"}}>
            {props.children}
        </div>
    )
}