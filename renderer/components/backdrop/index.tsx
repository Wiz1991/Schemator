import classNames from 'classnames';
import React, { ReactNode } from 'react';

const Backdrop = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
>((props, ref) => {
    const { open, className, ...other } = props;

    return (
        <div
            className={classNames({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        ></div>
    );
});

export { Backdrop };
