import {
    FaFile,
    FaFileExcel,
    FaFilePdf,
    FaFilePowerpoint,
    FaFileWord,
    FaDownload,
} from 'react-icons/fa';

import type { WPAttachment } from '@/lib/types';

function iconFor(mimeType: string) {
    if (mimeType === 'application/pdf') return FaFilePdf;
    if (mimeType.includes('word')) return FaFileWord;
    if (mimeType.includes('sheet') || mimeType.includes('excel'))
        return FaFileExcel;
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint'))
        return FaFilePowerpoint;
    return FaFile;
}

export function Attachments({ files }: { files: WPAttachment[] }) {
    if (!files.length) return null;

    return (
        <ul className="grid gap-3 sm:grid-cols-2">
            {files.map(file => {
                const Icon = iconFor(file.mime_type);
                return (
                    <li key={file.id}>
                        <a
                            href={file.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card card-hover flex items-center gap-3 p-4"
                        >
                            <Icon
                                size={22}
                                className="shrink-0 text-primary"
                            />
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-700">
                                {file.filename}
                            </span>
                            <FaDownload
                                size={14}
                                className="shrink-0 text-neutral-400"
                            />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
