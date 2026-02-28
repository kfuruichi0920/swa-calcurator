import './MemoryPanel.css';
interface MemoryPanelProps {
    values: number[];
    currentSlot: number;
    onSlotChange: (slot: number) => void;
}
declare function MemoryPanel({ values, currentSlot, onSlotChange }: MemoryPanelProps): import("react/jsx-runtime").JSX.Element;
export default MemoryPanel;
