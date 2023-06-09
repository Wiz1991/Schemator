import { Button, ButtonGroup, TextField } from '@mui/material';
import styles from './styles.module.css';

export function CreateSection({ cancel }: { cancel: () => void }) {
    return (
        <form
            className={styles['form-container']}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className={styles.form}>
                <TextField variant="standard" placeholder="Name" size="small" />
                <TextField
                    variant="standard"
                    placeholder="Layout Type"
                    size="small"
                />
            </div>
            <div className={styles['form-action']}>
                <Button size="small" variant="text" onClick={() => cancel()}>
                    Cancel
                </Button>
                <Button size="small" variant="contained">
                    Save
                </Button>
            </div>
        </form>
    );
}
