import Link from 'next/link';
import React from 'react'

export default function Sidebar({ docs }) {
    const rootNode = docs.filter((doc) => doc.parent === null);
    const nonRootNodes = Object.groupBy(docs.filter(doc => doc.parent), ({ parent }) => parent);
    console.log('rootNode', rootNode);
    console.log('nonRootNodes', nonRootNodes);

    return (
        <>
            <nav className="hidden lg:mt-10 lg:block">
                <ul role="list" className="border-l border-transparent">
                    {
                        rootNode.map((root) => (
                            <li li className="relative" key={root.id}>
                                <Link
                                    aria-current="page"
                                    className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                                    href={`/docs/${root.id}`}
                                ><span className="truncate">{root.title}</span></Link>
                                <ul role="list" style={{ opacity: 1 }}>
                                    {
                                        nonRootNodes[root.id]?.map((subRoot) => (
                                            <li key={root.id}>
                                                <Link
                                                    className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                                    href={`/docs/${root.id}/${subRoot.id}`}
                                                ><span className="truncate">{subRoot.title}</span></Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </nav >
        </>
    )
}
