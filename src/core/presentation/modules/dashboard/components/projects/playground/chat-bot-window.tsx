export const ChatBotWindow = ({ llmContext }: { llmContext: string | null }) => {
  return (
    <div>
      {!llmContext && <h2 className="mb-6 text-2xl font-bold">What can I help with?</h2>}

      {llmContext &&
        JSON.parse(llmContext).map((message: { role: string; content: string }, index: number) => (
          <div key={index}>
            <div className="mb-2 text-sm font-semibold">{message.role}</div>
            <div className="text-sm">{message.content}</div>
          </div>
        ))}
    </div>
  );
};
