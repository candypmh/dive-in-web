interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen, title, message, onConfirm, onCancel}) => {
    if(!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-white rouded-lg p-6 w-80">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">아니오</button>
            <button onClick={onConfirm} className="bg-blue-900 text-white px-4 py-2 rounded">예</button>
          </div>
        </div>
      </div>
  );
};

export default CustomModal