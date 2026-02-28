import { HistoryEntry } from '../core/HistoryManager';
import './HistoryPanel.css';
interface HistoryPanelProps {
    entries: HistoryEntry[];
    onEntryClick: (value: number) => void;
    onEntryDelete: (id: string) => void;
    onClear: () => void;
    onExport: (format: 'json' | 'text') => void;
    onCopy: () => void;
}
declare function HistoryPanel({ entries, onEntryClick, onEntryDelete, onClear, onExport, onCopy, }: HistoryPanelProps): import("react/jsx-runtime").JSX.Element;
export default HistoryPanel;
